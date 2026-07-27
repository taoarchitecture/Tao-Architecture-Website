import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyAuth, unauthorized } from '@/lib/auth';

// GET /api/pages/[slug] — public (frontend uses this to load page intros)
export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const page = await prisma.pageContent.findUnique({ where: { pageSlug: slug } });
    // Return null gracefully — frontend falls back to hardcoded content
    return NextResponse.json(page ?? null);
  } catch (error) {
    console.error('GET /api/pages/[slug] error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

// DELETE /api/pages/[slug] — protected
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const actor = verifyAuth(req);
  if (!actor || actor.role !== 'admin') return unauthorized();

  const { slug } = await params;
  try {
    await prisma.pageContent.delete({ where: { pageSlug: slug } });
    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error('DELETE /api/pages/[slug] error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
