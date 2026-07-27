import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyAuth, unauthorized } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const actor = verifyAuth(req);
  if (!actor) return unauthorized();

  try {
    const user = await prisma.user.findUnique({
      where: { id: actor.id },
      select: { id: true, email: true, role: true, createdAt: true },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Auth/me error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
