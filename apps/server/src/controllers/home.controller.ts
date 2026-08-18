import { Request, Response } from 'express';
import prisma from '../prisma';
import { AppError } from '../utils/app-error';
import { asyncHandler } from '../utils/async-handler';

export const getHomeConfig = asyncHandler(async (req: Request, res: Response) => {
  const config = await prisma.homeConfig.findFirst();
  if (!config) {
    res.json({}); // Return empty if not set
    return;
  }

  res.json({
    ...config,
    heroSlides: config.heroSlides ? JSON.parse(config.heroSlides) : [],
  });
});

export const updateHomeConfig = asyncHandler(async (req: Request, res: Response) => {
  const { bannerText, bottomCtaTitle, bottomCtaText, bottomCtaLink, existingHeroSlides, heroSlides } = req.body;

  let slides: unknown[];

  if (heroSlides !== undefined) {
    // JSON contract (admin UI's direct-to-Cloudinary upload flow): the client
    // already resolved the full slide list, with URLs, and sends it as-is.
    try {
      slides = Array.isArray(heroSlides) ? heroSlides : JSON.parse(heroSlides);
    } catch {
      throw new AppError('heroSlides must be valid JSON', 400);
    }
  } else {
    // Legacy multipart contract: new files in this request merge with the
    // preserved existing slides sent as a JSON string field.
    const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
    const newSlideFiles = files?.['heroSlides'] || [];

    try {
      slides = existingHeroSlides ? JSON.parse(existingHeroSlides) : [];
    } catch {
      throw new AppError('existingHeroSlides must be valid JSON', 400);
    }

    // Note: In real Cloudinary usage, file.path is the URL. In local, it's a path.
    const newSlides = newSlideFiles.map(file => ({
      image: file.path.includes('http') ? file.path : `/uploads/${file.filename}`,
      title: '',
      subtitle: ''
    }));

    slides = [...slides, ...newSlides];
  }

  try {
    // Check if config exists
    const existing = await prisma.homeConfig.findFirst();

    let result;
    if (existing) {
      result = await prisma.homeConfig.update({
        where: { id: existing.id },
        data: {
          bannerText,
          bottomCtaTitle,
          bottomCtaText,
          bottomCtaLink,
          heroSlides: JSON.stringify(slides),
        },
      });
    } else {
      result = await prisma.homeConfig.create({
        data: {
          bannerText,
          bottomCtaTitle,
          bottomCtaText,
          bottomCtaLink,
          heroSlides: JSON.stringify(slides),
        },
      });
    }

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating home config' });
  }
});
