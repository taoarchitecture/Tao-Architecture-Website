import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyAuth, unauthorized } from '@/lib/auth';

const parseMember = (m: { bio: string | null;[key: string]: unknown }) => ({
  ...m,
  bio: m.bio ? JSON.parse(m.bio as string) : [],
});

// GET /api/studio — public
export async function GET() {
  try {
    const members = await prisma.teamMember.findMany({ orderBy: { order: 'asc' } });
    return NextResponse.json(members.map(parseMember));
  } catch (error) {
    console.error('GET /api/studio error:', error);
    return NextResponse.json({ message: 'Error fetching team' }, { status: 500 });
  }
}

// POST /api/studio — protected, image is Cloudinary URL
export async function POST(req: NextRequest) {
  const actor = verifyAuth(req);
  if (!actor || actor.role !== 'admin') return unauthorized();

  try {
    const { name, role, bio, image, order, active } = await req.json();

    if (!name || !role) {
      return NextResponse.json({ message: 'name and role are required' }, { status: 400 });
    }

    const member = await prisma.teamMember.create({
      data: {
        name, role,
        bio: bio ? JSON.stringify(bio) : '[]',
        image: image || '',
        order: Number(order || 0),
        active: active !== false,
      },
    });
    return NextResponse.json(parseMember(member), { status: 201 });
  } catch (error) {
    console.error('POST /api/studio error:', error);
    return NextResponse.json({ message: 'Error creating team member' }, { status: 500 });
  }
}
