import { Request, Response } from 'express';
import prisma from '../prisma';

export const getHomeConfig = async (req: Request, res: Response) => {
  try {
    const config = await prisma.homeConfig.findFirst();
    if (!config) return res.json({}); // Return empty if not set
    
    res.json({
      ...config,
      heroSlides: config.heroSlides ? JSON.parse(config.heroSlides) : [],
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching home config' });
  }
};

export const updateHomeConfig = async (req: Request, res: Response) => {
  try {
    const { bannerText, bottomCtaTitle, bottomCtaText, bottomCtaLink, existingHeroSlides } = req.body;
    
    // Handle Hero Slides Uploads
    // Assuming 'heroSlides' field in form data contains new files
    // and 'existingHeroSlides' contains JSON string of preserved slides
    
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const newSlideFiles = files['heroSlides'] || [];

    let slides = existingHeroSlides ? JSON.parse(existingHeroSlides) : [];

    // Add new files
    // Note: In real Cloudinary usage, file.path is the URL. In local, it's a path.
    const newSlides = newSlideFiles.map(file => ({
      image: file.path.includes('http') ? file.path : `/uploads/${file.filename}`,
      title: '',
      subtitle: ''
    }));

    slides = [...slides, ...newSlides];

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
};
