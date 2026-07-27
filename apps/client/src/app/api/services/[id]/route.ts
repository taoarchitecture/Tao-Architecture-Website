import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyAuth, unauthorized } from '@/lib/auth';

// GET /api/services/[id] — public
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const service = await prisma.service.findUnique({ where: { id: Number(id) } });
    if (!service) return NextResponse.json({ message: 'Not found' }, { status: 404 });
    return NextResponse.json({ ...service, items: service.items ? JSON.parse(service.items) : [] });
  } catch (error) {
    console.error('GET /api/services/[id] error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

// PUT /api/services/[id] — protected
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const actor = verifyAuth(req);
  if (!actor || actor.role !== 'admin') return unauthorized();

  const { id } = await params;
  try {
    const existing = await prisma.service.findUnique({ where: { id: Number(id) } });
    if (!existing) return NextResponse.json({ message: 'Not found' }, { status: 404 });

    const { title, slug, subtitle, description, items, image, order, isActive } = await req.json();

    const updated = await prisma.service.update({
      where: { id: Number(id) },
      data: {
        title: title ?? existing.title,
        slug: slug ?? existing.slug,
        subtitle: subtitle ?? existing.subtitle,
        description: description ?? existing.description,
        items: items ? JSON.stringify(items) : existing.items,
        image: image !== undefined ? image : existing.image,
        order: order !== undefined ? Number(order) : existing.order,
        isActive: isActive !== undefined ? isActive : existing.isActive,
      },
    });
    return NextResponse.json({ ...updated, items: updated.items ? JSON.parse(updated.items) : [] });
  } catch (error) {
    console.error('PUT /api/services/[id] error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

// DELETE /api/services/[id] — protected
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const actor = verifyAuth(req);
  if (!actor || actor.role !== 'admin') return unauthorized();

  const { id } = await params;
  try {
    await prisma.service.delete({ where: { id: Number(id) } });
    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error('DELETE /api/services/[id] error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
