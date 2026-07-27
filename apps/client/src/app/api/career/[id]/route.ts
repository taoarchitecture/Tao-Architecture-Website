import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyAuth, unauthorized } from '@/lib/auth';

// GET /api/career/[id] — protected admin
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const actor = verifyAuth(req);
  if (!actor || actor.role !== 'admin') return unauthorized();

  const { id } = await params;
  try {
    const numId = Number(id);
    if (!Number.isInteger(numId) || numId <= 0) {
      return NextResponse.json({ message: 'Invalid application id' }, { status: 400 });
    }

    const application = await prisma.application.findUnique({ where: { id: numId } });
    if (!application) return NextResponse.json({ message: 'Not found' }, { status: 404 });

    return NextResponse.json(application);
  } catch (error) {
    console.error('GET /api/career/[id] error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

// DELETE /api/career/[id] — protected admin
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const actor = verifyAuth(req);
  if (!actor || actor.role !== 'admin') return unauthorized();

  const { id } = await params;
  try {
    const numId = Number(id);
    if (!Number.isInteger(numId) || numId <= 0) {
      return NextResponse.json({ message: 'Invalid application id' }, { status: 400 });
    }

    await prisma.application.delete({ where: { id: numId } });
    return NextResponse.json({ message: 'Application deleted successfully' });
  } catch (error) {
    console.error('DELETE /api/career/[id] error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
