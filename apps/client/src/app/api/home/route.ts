import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyAuth, unauthorized } from '@/lib/auth';

// GET /api/home — public
export async function GET() {
  try {
    const config = await prisma.homeConfig.findFirst();
    if (!config) return NextResponse.json({});
    return NextResponse.json({
      ...config,
      heroSlides: config.heroSlides ? JSON.parse(config.heroSlides) : [],
    });
  } catch (error) {
    console.error('GET /api/home error:', error);
    return NextResponse.json({ message: 'Error fetching home config' }, { status: 500 });
  }
}

// PUT /api/home — protected, accepts Cloudinary URLs for hero slides
export async function PUT(req: NextRequest) {
  const actor = verifyAuth(req);
  if (!actor || actor.role !== 'admin') return unauthorized();

  try {
    const { bannerText, bottomCtaTitle, bottomCtaText, bottomCtaLink, heroSlides } = await req.json();

    // heroSlides is already an array of { image, title, subtitle } from the client
    // after direct Cloudinary upload
    const existing = await prisma.homeConfig.findFirst();
    const data = {
      bannerText,
      bottomCtaTitle,
      bottomCtaText,
      bottomCtaLink,
      heroSlides: heroSlides ? JSON.stringify(heroSlides) : '[]',
    };

    const result = existing
      ? await prisma.homeConfig.update({ where: { id: existing.id }, data })
      : await prisma.homeConfig.create({ data });

    return NextResponse.json(result);
  } catch (error) {
    console.error('PUT /api/home error:', error);
    return NextResponse.json({ message: 'Error updating home config' }, { status: 500 });
  }
}
