import { Request, Response } from 'express';
import prisma from '../prisma';
import { AppError } from '../utils/app-error';
import { asyncHandler } from '../utils/async-handler';

// --- Publications ---

export const getPublications = asyncHandler(async (req: Request, res: Response) => {
  const pubs = await prisma.publication.findMany({ orderBy: { order: 'asc' } });
  res.json(pubs);
});

export const createPublication = asyncHandler(async (req: Request, res: Response) => {
  const { title, category, link, order } = req.body;
  const file = req.file;

  if (!title || !category) {
    throw new AppError('title and category are required', 400);
  }

  const image = file ? (file.path.includes('http') ? file.path : `/uploads/${file.filename}`) : '';

  const pub = await prisma.publication.create({
    data: {
      title,
      category,
      link,
      image,
      order: Number(order || 0),
    },
  });
  res.status(201).json(pub);
});

export const updatePublication = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, category, link, order } = req.body;
  const file = req.file;

  const existing = await prisma.publication.findUnique({ where: { id: Number(id) } });
  if (!existing) throw new AppError('Not found', 404);

  let image = existing.image;
  if (file) {
    image = file.path.includes('http') ? file.path : `/uploads/${file.filename}`;
  }

  const updated = await prisma.publication.update({
    where: { id: Number(id) },
    data: { title, category, link, image, order: Number(order) },
  });
  res.json(updated);
});

export const deletePublication = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.publication.delete({ where: { id: Number(id) } });
  res.json({ message: 'Deleted' });
});

// --- Awards ---

export const getAwards = asyncHandler(async (req: Request, res: Response) => {
  const awards = await prisma.award.findMany({ orderBy: { order: 'asc' } });
  res.json(awards);
});

export const createAward = asyncHandler(async (req: Request, res: Response) => {
  const { title, year, description, order } = req.body;
  const file = req.file;

  if (!title) {
    throw new AppError('title is required', 400);
  }

  const image = file ? (file.path.includes('http') ? file.path : `/uploads/${file.filename}`) : '';

  const award = await prisma.award.create({
    data: {
      title,
      year,
      description,
      image,
      order: Number(order || 0),
    },
  });
  res.status(201).json(award);
});

export const updateAward = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, year, description, order } = req.body;
  const file = req.file;

  const existing = await prisma.award.findUnique({ where: { id: Number(id) } });
  if (!existing) throw new AppError('Not found', 404);

  let image = existing.image;
  if (file) {
    image = file.path.includes('http') ? file.path : `/uploads/${file.filename}`;
  }

  const updated = await prisma.award.update({
    where: { id: Number(id) },
    data: { title, year, description, image, order: Number(order) },
  });
  res.json(updated);
});

export const deleteAward = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.award.delete({ where: { id: Number(id) } });
  res.json({ message: 'Deleted' });
});
