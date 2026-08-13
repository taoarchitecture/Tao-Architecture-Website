import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/media/publications — public
export async function GET() {
  try {
    const publications = await prisma.publication.findMany({ orderBy: { order: 'asc' } });
    return NextResponse.json(publications);
  } catch (error) {
    console.error('GET /api/media/publications error:', error);
    return NextResponse.json({ message: 'Error fetching publications' }, { status: 500 });
  }
}
