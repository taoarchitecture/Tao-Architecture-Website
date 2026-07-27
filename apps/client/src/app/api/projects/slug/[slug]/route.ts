import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

type GalleryItem = { url: string; caption: string; order: number };

const safeJsonParse = <T>(value: string | null, fallback: T): T => {
  if (!value) return fallback;
  try { return JSON.parse(value) as T; } catch { return fallback; }
};

// GET /api/projects/slug/[slug] — public
export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const project = await prisma.project.findUnique({ where: { slug } });
    if (!project) return NextResponse.json({ message: 'Project not found' }, { status: 404 });

    return NextResponse.json({
      ...project,
      description: safeJsonParse(project.description, null),
      gallery: safeJsonParse<GalleryItem[]>(project.gallery, []),
    });
  } catch (error) {
    console.error('GET /api/projects/slug/[slug] error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
