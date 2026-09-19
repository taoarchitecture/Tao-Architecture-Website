import { Request, Response } from 'express';
import prisma from '../prisma';
import { AppError } from '../utils/app-error';
import { asyncHandler } from '../utils/async-handler';
import { safeJsonParse } from '../utils/json';

export const getHomeConfig = asyncHandler(async (req: Request, res: Response) => {
  const config = await prisma.homeConfig.findFirst();
  if (!config) {
    res.json({}); // Return empty if not set
    return;
  }

  res.json({
    ...config,
    heroSlides: safeJsonParse(config.heroSlides, []),
  });
});

export const updateHomeConfig = asyncHandler(async (req: Request, res: Response) => {
  const { bannerText, bottomCtaTitle, bottomCtaText, bottomCtaLink, existingHeroSlides, heroSlides } = req.body;

  let slides: unknown[];

  if (heroSlides !== undefined) {
    // JSON contract (admin UI's direct-to-Cloudinary upload flow): the client
    // already resolved the full slide list, with URLs, and sends it as-is.
    const parsed = Array.isArray(heroSlides)
      ? heroSlides
      : safeJsonParse<unknown[] | null>(heroSlides, null);

    if (!Array.isArray(parsed)) {
      throw new AppError('heroSlides must be valid JSON array', 400);
    }
    slides = parsed;
  } else {
    // Legacy multipart contract: new files in this request merge with the
    // preserved existing slides sent as a JSON string field.
    const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
    const newSlideFiles = files?.['heroSlides'] || [];

    slides = safeJsonParse<unknown[]>(existingHeroSlides, []);

    // Note: In real Cloudinary usage, file.path is the URL. In local, it's a path.
    const newSlides = newSlideFiles.map(file => ({
      image: file.path.includes('http') ? file.path : `/uploads/${file.filename}`,
      title: '',
      subtitle: ''
    }));

    slides = [...slides, ...newSlides];
  }

  const existing = await prisma.homeConfig.findFirst();

  const data = {
    bannerText,
    bottomCtaTitle,
    bottomCtaText,
    bottomCtaLink,
    heroSlides: JSON.stringify(slides),
  };

  const result = existing
    ? await prisma.homeConfig.update({
        where: { id: existing.id },
        data,
      })
    : await prisma.homeConfig.create({
        data,
      });

  res.json(result);
});
