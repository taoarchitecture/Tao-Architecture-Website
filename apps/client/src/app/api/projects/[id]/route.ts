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

// GET /api/projects/[id] — public
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const numId = Number(id);
    if (!Number.isInteger(numId) || numId <= 0) {
      return NextResponse.json({ message: 'Invalid project id' }, { status: 400 });
    }
    const project = await prisma.project.findUnique({ where: { id: numId } });
    if (!project) return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    return NextResponse.json(mapProject(project));
  } catch (error) {
    console.error('GET /api/projects/[id] error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

// PUT /api/projects/[id] — protected
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const actor = verifyAuth(req);
  if (!actor || actor.role !== 'admin') return unauthorized();

  const { id } = await params;
  try {
    const numId = Number(id);
    if (!Number.isInteger(numId) || numId <= 0) {
      return NextResponse.json({ message: 'Invalid project id' }, { status: 400 });
    }

    const existing = await prisma.project.findUnique({ where: { id: numId } });
    if (!existing) return NextResponse.json({ message: 'Project not found' }, { status: 404 });

    const body = await req.json();
    const { title, slug, subtitle, category, location, status, plotArea, builtUpArea,
      description, coverImage, gallery, seoTitle, seoDesc, isPublished, isFeatured, order, relatedProjects } = body;

    // Merge existing gallery with any new items from Cloudinary
    const existingGallery = safeJsonParse<GalleryItem[]>(existing.gallery, []);
    const newGalleryItems: GalleryItem[] = Array.isArray(gallery) ? gallery : [];
    const mergedGallery = newGalleryItems.length > 0 ? newGalleryItems : existingGallery;

    const updated = await prisma.project.update({
      where: { id: numId },
      data: {
        title: title ?? existing.title,
        slug: slug ?? existing.slug,
        subtitle: subtitle ?? existing.subtitle,
        category: category ?? existing.category,
        location: location ?? existing.location,
        status: status ?? existing.status,
        plotArea: plotArea ?? existing.plotArea,
        builtUpArea: builtUpArea ?? existing.builtUpArea,
        description: description ?? existing.description,
        coverImage: coverImage !== undefined ? coverImage : existing.coverImage,
        gallery: JSON.stringify(mergedGallery),
        seoTitle: seoTitle ?? existing.seoTitle,
        seoDesc: seoDesc ?? existing.seoDesc,
        isPublished: isPublished ?? existing.isPublished,
        isFeatured: isFeatured ?? existing.isFeatured,
        order: order ?? existing.order,
        relatedProjects: relatedProjects !== undefined ? JSON.stringify(relatedProjects) : existing.relatedProjects,
      },
    });
    return NextResponse.json(mapProject(updated));
  } catch (error) {
    console.error('PUT /api/projects/[id] error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

// DELETE /api/projects/[id] — protected
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const actor = verifyAuth(req);
  if (!actor || actor.role !== 'admin') return unauthorized();

  const { id } = await params;
  try {
    const numId = Number(id);
    if (!Number.isInteger(numId) || numId <= 0) {
      return NextResponse.json({ message: 'Invalid project id' }, { status: 400 });
    }
    const existing = await prisma.project.findUnique({ where: { id: numId } });
    if (!existing) return NextResponse.json({ message: 'Project not found' }, { status: 404 });

    await prisma.project.delete({ where: { id: numId } });
    return NextResponse.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('DELETE /api/projects/[id] error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
