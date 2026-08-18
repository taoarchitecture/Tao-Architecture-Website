import { Request, Response } from 'express';
import { fetchAndStoreAllVideos, searchVideos } from '../services/youtube.service';
import prisma from '../prisma';
import { AppError } from '../utils/app-error';
import { asyncHandler } from '../utils/async-handler';

const parsePositiveInteger = (value: string | undefined, fallback: number) => {
  if (value === undefined || value === '') return fallback;
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new AppError('Pagination values must be positive integers', 400);
  }
  return parsed;
};

export const listVideos = asyncHandler(async (req: Request, res: Response) => {
  const q = (req.query.q as string) || undefined;
  const category = (req.query.category as string) || undefined;
  const tag = (req.query.tag as string) || undefined;
  const sort = (req.query.sort as 'date' | 'views') || 'date';
  const page = parsePositiveInteger(req.query.page as string | undefined, 1);
  const pageSize = parsePositiveInteger(req.query.pageSize as string | undefined, 24);

  let isShort: boolean | undefined = undefined;
  if (req.query.isShort === 'true') isShort = true;
  else if (req.query.isShort === 'false') isShort = false;

  const data = await searchVideos({ q, category, tag, sort, isShort, page, pageSize });
  res.json(data);
});

export const getVideo = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const video = await prisma.video.findUnique({ where: { videoId: id } });
  if (!video) throw new AppError('Not found', 404);
  res.json(video);
});

export const syncAll = asyncHandler(async (req: Request, res: Response) => {
  const handle = process.env.YOUTUBE_CHANNEL_HANDLE || '@TAOSTUDIO_0';
  try {
    const result = await fetchAndStoreAllVideos(handle);
    res.json({ message: 'Synced', ...result });
  } catch (e: any) {
    res.status(500).json({ message: e.message || 'Sync error' });
  }
});
