import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyAuth, unauthorized } from '@/lib/auth';

type GalleryItem = { url: string; caption: string; order: number };

const safeJsonParse = <T>(value: string | null, fallback: T): T => {
  if (!value) return fallback;
  try { return JSON.parse(value) as T; } catch { return fallback; }
};

const mapProject = (p: { description: string | null; gallery: string | null;[key: string]: unknown }) => ({
  ...p,
  description: safeJsonParse(p.description as string | null, null),
  gallery: safeJsonParse<GalleryItem[]>(p.gallery as string | null, []),
});

// GET /api/projects — public, no auth required
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = searchParams.get('limit') ? Number(searchParams.get('limit')) : undefined;
    const cursor = searchParams.get('cursor') ? Number(searchParams.get('cursor')) : undefined;

    if (!limit) {
      const projects = await prisma.project.findMany({ orderBy: { order: 'asc' } });
      return NextResponse.json(projects.map(mapProject));
    }

    const projects = await prisma.project.findMany({
      orderBy: { id: 'desc' },
      take: limit + 1,
      ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
    });

    const hasNextPage = projects.length > limit;
    const items = hasNextPage ? projects.slice(0, limit) : projects;
    const nextCursor = hasNextPage ? (items[items.length - 1]?.id ?? null) : null;

    return NextResponse.json({ items: items.map(mapProject), nextCursor, hasNextPage });
  } catch (error) {
    console.error('GET /api/projects error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

// POST /api/projects — protected, admin only
// In the serverless model, file URLs come pre-uploaded to Cloudinary from the client.
export async function POST(req: NextRequest) {
  const actor = verifyAuth(req);
  if (!actor || actor.role !== 'admin') return unauthorized();

  try {
    const body = await req.json();
    const { title, slug, subtitle, category, location, status, plotArea, builtUpArea,
      description, coverImage, gallery, seoTitle, seoDesc, isPublished, isFeatured, order, relatedProjects } = body;

    if (!title || !slug || !category) {
      return NextResponse.json({ message: 'title, slug, and category are required' }, { status: 400 });
    }

    const project = await prisma.project.create({
      data: {
        title, slug, subtitle, category, location, status, plotArea, builtUpArea,
        description: description || '[]',
        coverImage: coverImage || null,
        gallery: gallery ? JSON.stringify(gallery) : '[]',
        seoTitle, seoDesc,
        isPublished: isPublished ?? true,
        isFeatured: isFeatured ?? false,
        order: order ?? 0,
        relatedProjects: relatedProjects ? JSON.stringify(relatedProjects) : '[]',
      },
    });

    return NextResponse.json(mapProject(project), { status: 201 });
  } catch (error) {
    console.error('POST /api/projects error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
