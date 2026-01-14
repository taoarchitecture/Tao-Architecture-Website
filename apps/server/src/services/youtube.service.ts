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

export async function getVideoStats(videoIds: string[]) {
  if (videoIds.length === 0) return {};
  const key = process.env.YOUTUBE_API_KEY!;
  const ids = videoIds.join(',');
  const url = `${API_BASE}/videos?part=statistics&id=${ids}&key=${key}`;
  const data = await apiGet(url);
  const map: Record<string, number> = {};
  for (const item of data.items || []) {
    map[item.id] = parseInt(item.statistics?.viewCount || '0', 10);
  }
  return map;
}

export async function fetchAndStoreAllVideos(channelHandle: string) {
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
  const stats = await getVideoStats(ids.slice(0, 50));
  for (let i = 50; i < ids.length; i += 50) {
    Object.assign(stats, await getVideoStats(ids.slice(i, i + 50)));
  }
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
    await prisma.video.upsert({
      where: { videoId: vid },
      update: {
        title: sn.title,
        description: sn.description || null,
        thumbnailUrl: thumb,
        publishedAt: new Date(sn.publishedAt),
        viewCount: stats[vid] ?? null,
        channelId,
        lastSyncedAt: new Date(),
      },
      create: {
        videoId: vid,
        title: sn.title,
        description: sn.description || null,
        thumbnailUrl: thumb,
        publishedAt: new Date(sn.publishedAt),
        viewCount: stats[vid] ?? null,
        channelId,
        etag: item.etag || null,
        lastSyncedAt: new Date(),
      },
    });
  }
  return { count: allItems.length, channelId };
}

export async function searchVideos(params: {
  q?: string;
  category?: string;
  tag?: string;
  sort?: 'date' | 'views';
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
