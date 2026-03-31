import { Request, Response } from 'express';
import prisma from '../prisma';

export const getAllPageContent = async (req: Request, res: Response) => {
  try {
    const pages = await prisma.pageContent.findMany({
      orderBy: { pageSlug: 'asc' },
    });
    res.json(pages);
  } catch (error) {
    console.error('Error fetching page content:', error);
    res.status(500).json({ message: 'Error fetching page content' });
  }
};

export const getPageContentBySlug = async (req: Request, res: Response) => {
  const { slug } = req.params;
  try {
    const page = await prisma.pageContent.findUnique({
      where: { pageSlug: slug },
    });
    if (!page) {
      return res.json(null); // Graceful: return null so frontend uses hardcoded fallback
    }
    res.json(page);
  } catch (error) {
    console.error('Error fetching page content:', error);
    res.status(500).json({ message: 'Error fetching page content' });
  }
};

export const upsertPageContent = async (req: Request, res: Response) => {
  try {
    const { pageSlug, title, content } = req.body;

    if (!pageSlug) {
      return res.status(400).json({ message: 'pageSlug is required' });
    }

    const result = await prisma.pageContent.upsert({
      where: { pageSlug },
      update: { title, content },
      create: { pageSlug, title, content },
    });

    res.json(result);
  } catch (error) {
    console.error('Error saving page content:', error);
    res.status(500).json({ message: 'Error saving page content' });
  }
};

export const deletePageContent = async (req: Request, res: Response) => {
  const { slug } = req.params;
  try {
    await prisma.pageContent.delete({ where: { pageSlug: slug } });
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error('Error deleting page content:', error);
    res.status(500).json({ message: 'Error deleting page content' });
  }
};
