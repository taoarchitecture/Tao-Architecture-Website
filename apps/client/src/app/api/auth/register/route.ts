import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import { verifyAuth, unauthorized } from '@/lib/auth';

export async function POST(req: NextRequest) {
  // Explicitly re-verify auth — no middleware inheritance in Next.js
  const actor = verifyAuth(req);
  if (!actor || actor.role !== 'admin') return unauthorized();

  if (process.env.ALLOW_ADMIN_REGISTRATION !== 'true') {
    return NextResponse.json(
      { message: 'Admin registration is disabled.' },
      { status: 403 }
    );
  }

  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ message: 'A user with this email already exists' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, role: 'admin' },
    });

    return NextResponse.json({ message: 'User created', userId: user.id }, { status: 201 });
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json({ message: 'Error creating user' }, { status: 500 });
  }
}
