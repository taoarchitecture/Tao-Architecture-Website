import { Request, Response } from 'express';
import { fetchAndStoreAllVideos, searchVideos } from '../services/youtube.service';
import prisma from '../prisma';

export async function listVideos(req: Request, res: Response) {
  const q = (req.query.q as string) || undefined;
  const category = (req.query.category as string) || undefined;
  const tag = (req.query.tag as string) || undefined;
  const sort = (req.query.sort as 'date' | 'views') || 'date';
  const page = parseInt((req.query.page as string) || '1', 10);
  const pageSize = parseInt((req.query.pageSize as string) || '24', 10);
  const data = await searchVideos({ q, category, tag, sort, page, pageSize });
  res.json(data);
}

export async function getVideo(req: Request, res: Response) {
  const id = req.params.id;
  const video = await prisma.video.findUnique({ where: { videoId: id } });
  if (!video) return res.status(404).json({ message: 'Not found' });
  res.json(video);
}

export async function syncAll(req: Request, res: Response) {
  const handle = process.env.YOUTUBE_CHANNEL_HANDLE || '@TAOSTUDIO_0';
  try {
    const result = await fetchAndStoreAllVideos(handle);
    res.json({ message: 'Synced', ...result });
  } catch (e: any) {
    res.status(500).json({ message: e.message || 'Sync error' });
  }
}
