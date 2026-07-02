import { Prisma } from '@prisma/client';
import prisma from '../prisma';

const API_BASE = 'https://www.googleapis.com/youtube/v3';

async function apiGet(url: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`YouTube API error: ${res.status}`);
  return res.json();
}

export async function resolveChannelIdFromHandle(handle: string) {
  const key = process.env.YOUTUBE_API_KEY!;
  const encoded = encodeURIComponent(handle.startsWith('@') ? handle : `@${handle}`);
  const url = `${API_BASE}/channels?part=id&forHandle=${encoded}&key=${key}`;
  const data = await apiGet(url);
  const id = data?.items?.[0]?.id;
  if (!id) throw new Error('Channel ID not found');
  return id as string;
}

export async function getUploadsPlaylistId(channelId: string) {
  const key = process.env.YOUTUBE_API_KEY!;
  const url = `${API_BASE}/channels?part=contentDetails&id=${channelId}&key=${key}`;
  const data = await apiGet(url);
  const uploads = data?.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
  if (!uploads) throw new Error('Uploads playlist not found');
  return uploads as string;
}

export async function listUploadsPage(playlistId: string, pageToken?: string) {
  const key = process.env.YOUTUBE_API_KEY!;
  const params = new URLSearchParams({
    part: 'snippet,contentDetails',
    playlistId,
    maxResults: '50',
    key,
  });
  if (pageToken) params.set('pageToken', pageToken);
  const url = `${API_BASE}/playlistItems?${params.toString()}`;
  return apiGet(url);
}

export async function getVideoDetails(videoIds: string[]) {
  if (videoIds.length === 0) return {};
  const key = process.env.YOUTUBE_API_KEY!;
  const ids = videoIds.join(',');
  const url = `${API_BASE}/videos?part=statistics,contentDetails&id=${ids}&key=${key}`;
  const data = await apiGet(url);
  const map: Record<string, { viewCount: number; duration: string }> = {};
  for (const item of data.items || []) {
    map[item.id] = {
      viewCount: parseInt(item.statistics?.viewCount || '0', 10),
      duration: item.contentDetails?.duration || '',
    };
  }
  return map;
}

export function isVideoShort(durationStr: string | null | undefined): boolean {
  if (!durationStr) return false;
  // Parse ISO 8601 duration, e.g., PT1M5S, PT59S
  const match = durationStr.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return false;
  const hours = parseInt(match[1] || '0', 10);
  const minutes = parseInt(match[2] || '0', 10);
  const seconds = parseInt(match[3] || '0', 10);
  const totalSeconds = hours * 3600 + minutes * 60 + seconds;
  return totalSeconds <= 60;
}

export async function fetchAndStoreAllVideos(channelHandle: string) {
  console.log(`[YouTube Sync] Starting sync for handle: ${channelHandle}`);
  try {
    const channelId = await resolveChannelIdFromHandle(channelHandle);
    const uploadsId = await getUploadsPlaylistId(channelId);
    let pageToken: string | undefined = undefined;
    const allItems: any[] = [];
    for (;;) {
      const page = await listUploadsPage(uploadsId, pageToken);
      allItems.push(...(page.items || []));
      if (!page.nextPageToken) break;
      pageToken = page.nextPageToken;
    }
    const ids = allItems.map((i) => i.contentDetails?.videoId).filter(Boolean);
    console.log(`[YouTube Sync] Found ${ids.length} videos. Fetching details...`);
    
    const details = await getVideoDetails(ids.slice(0, 50));
    for (let i = 50; i < ids.length; i += 50) {
      Object.assign(details, await getVideoDetails(ids.slice(i, i + 50)));
    }
    
    let updatedCount = 0;
    for (const item of allItems) {
      const vid = item.contentDetails.videoId;
      const sn = item.snippet;
      const thumb =
        sn.thumbnails?.maxres?.url ||
        sn.thumbnails?.standard?.url ||
        sn.thumbnails?.high?.url ||
        sn.thumbnails?.medium?.url ||
        sn.thumbnails?.default?.url ||
        '';
      const videoDetail = details[vid] || { viewCount: 0, duration: null };
      await prisma.video.upsert({
        where: { videoId: vid },
        update: {
          title: sn.title,
          description: sn.description || null,
          thumbnailUrl: thumb,
          publishedAt: new Date(sn.publishedAt),
          viewCount: videoDetail.viewCount,
          channelId,
          duration: videoDetail.duration,
          isShort: isVideoShort(videoDetail.duration),
          lastSyncedAt: new Date(), 
        },
        create: {
          videoId: vid,
          title: sn.title,
          description: sn.description || null,
          thumbnailUrl: thumb,
          publishedAt: new Date(sn.publishedAt),
          viewCount: videoDetail.viewCount,
          channelId,
          duration: videoDetail.duration,
          isShort: isVideoShort(videoDetail.duration),
          etag: item.etag || null,
          lastSyncedAt: new Date(),
        },
      });
      updatedCount++;
    }
    console.log(`[YouTube Sync] Successfully synced ${updatedCount} videos.`);
    return { count: allItems.length, channelId };
  } catch (error: any) {
    console.error(`[YouTube Sync] Error during sync:`, error.message);
    throw error;
  }
}

export async function searchVideos(params: {
  q?: string;
  category?: string;
  tag?: string;
  sort?: 'date' | 'views';
  isShort?: boolean;
  page?: number;
  pageSize?: number;
}) {
  const page = params.page ?? 1;
  const pageSize = params.pageSize ?? 24;
  const skip = (page - 1) * pageSize;
  const where: any = {};
  if (params.q) {
    where.OR = [
      { title: { contains: params.q, mode: 'insensitive' } },
      { description: { contains: params.q, mode: 'insensitive' } },
    ];
  }
  if (params.tag) {
    where.tags = { some: { tag: { name: { equals: params.tag } } } };
  }
  if (params.category) {
    where.categories = { some: { category: { name: { equals: params.category } } } };
  }
  if (params.isShort !== undefined) {
    where.isShort = params.isShort;
  }
  const orderBy: Prisma.VideoOrderByWithRelationInput | Prisma.VideoOrderByWithRelationInput[] =
    params.sort === 'views'
      ? [{ viewCount: 'desc' }, { publishedAt: 'desc' }]
      : [{ publishedAt: 'desc' }];
  const [items, total] = await Promise.all([
    prisma.video.findMany({ where, orderBy, skip, take: pageSize }),
    prisma.video.count({ where }),
  ]);
  return { items, total, page, pageSize };
}
