import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyAuth, unauthorized } from '@/lib/auth';

// GET /api/pages — protected admin
export async function GET(req: NextRequest) {
  const actor = verifyAuth(req);
  if (!actor || actor.role !== 'admin') return unauthorized();

  try {
    const pages = await prisma.pageContent.findMany({ orderBy: { pageSlug: 'asc' } });
    return NextResponse.json(pages);
  } catch (error) {
    console.error('GET /api/pages error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

// POST /api/pages — protected, upsert by pageSlug
export async function POST(req: NextRequest) {
  const actor = verifyAuth(req);
  if (!actor || actor.role !== 'admin') return unauthorized();

  try {
    const { pageSlug, title, content } = await req.json();
    if (!pageSlug) return NextResponse.json({ message: 'pageSlug is required' }, { status: 400 });

    const result = await prisma.pageContent.upsert({
      where: { pageSlug },
      update: { title, content },
      create: { pageSlug, title, content },
    });
    return NextResponse.json(result);
  } catch (error) {
    console.error('POST /api/pages error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
