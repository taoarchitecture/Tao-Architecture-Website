import { Request, Response } from 'express';
import prisma from '../prisma';

// --- Publications ---

export const getPublications = async (req: Request, res: Response) => {
  try {
    const pubs = await prisma.publication.findMany({ orderBy: { order: 'asc' } });
    res.json(pubs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching publications' });
  }
};

export const createPublication = async (req: Request, res: Response) => {
  try {
    const { title, category, link, order } = req.body;
    const file = req.file;
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
  } catch (error) {
    res.status(500).json({ message: 'Error creating publication' });
  }
};

export const updatePublication = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const { title, category, link, order } = req.body;
    const file = req.file;

    const existing = await prisma.publication.findUnique({ where: { id: Number(id) } });
    if (!existing) return res.status(404).json({ message: 'Not found' });

    let image = existing.image;
    if (file) {
      image = file.path.includes('http') ? file.path : `/uploads/${file.filename}`;
    }

    const updated = await prisma.publication.update({
      where: { id: Number(id) },
      data: { title, category, link, image, order: Number(order) },
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error updating publication' });
  }
};

export const deletePublication = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.publication.delete({ where: { id: Number(id) } });
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting' });
  }
};

// --- Awards ---

export const getAwards = async (req: Request, res: Response) => {
  try {
    const awards = await prisma.award.findMany({ orderBy: { order: 'asc' } });
    res.json(awards);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching awards' });
  }
};

export const createAward = async (req: Request, res: Response) => {
  try {
    const { title, year, description, order } = req.body;
    const file = req.file;
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
  } catch (error) {
    res.status(500).json({ message: 'Error creating award' });
  }
};

export const updateAward = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const { title, year, description, order } = req.body;
    const file = req.file;

    const existing = await prisma.award.findUnique({ where: { id: Number(id) } });
    if (!existing) return res.status(404).json({ message: 'Not found' });

    let image = existing.image;
    if (file) {
      image = file.path.includes('http') ? file.path : `/uploads/${file.filename}`;
    }

    const updated = await prisma.award.update({
      where: { id: Number(id) },
      data: { title, year, description, image, order: Number(order) },
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error updating award' });
  }
};

export const deleteAward = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.award.delete({ where: { id: Number(id) } });
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting' });
  }
};
