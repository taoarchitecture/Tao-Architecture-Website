import { Request, Response } from 'express';
import prisma from '../prisma';
import { AppError } from '../utils/app-error';
import { asyncHandler } from '../utils/async-handler';

const parse = (item: { titleLines: string | null; [key: string]: unknown }) => ({
  ...item,
  titleLines: item.titleLines ? JSON.parse(item.titleLines) : [],
});

// GET /api/home-grid — public
export const getHomeGridItems = asyncHandler(async (req: Request, res: Response) => {
  const items = await prisma.homeGridItem.findMany({ orderBy: { order: 'asc' } });
  res.json(items.map(parse));
});

// PUT /api/home-grid/:slotKey — admin. Only ever updates an existing slot;
// slots themselves are a fixed set defined alongside the homepage's layout
// code, not something the admin panel creates or deletes.
export const updateHomeGridItem = asyncHandler(async (req: Request, res: Response) => {
  const { slotKey } = req.params;
  const { category, title, titleLines, disciplines, image, link } = req.body;

  const existing = await prisma.homeGridItem.findUnique({ where: { slotKey } });
  if (!existing) {
    throw new AppError(`Unknown homepage grid slot: ${slotKey}`, 404);
  }

  const updated = await prisma.homeGridItem.update({
    where: { slotKey },
    data: {
      category: category ?? existing.category,
      title: title ?? existing.title,
      titleLines: titleLines !== undefined
        ? (typeof titleLines === 'string' ? titleLines : JSON.stringify(titleLines))
        : existing.titleLines,
      disciplines: disciplines ?? existing.disciplines,
      image: image ?? existing.image,
      link: link ?? existing.link,
    },
  });
  res.json(parse(updated));
});
