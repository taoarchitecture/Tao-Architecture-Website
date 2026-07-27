import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyAuth, unauthorized } from '@/lib/auth';

// GET /api/studio/[id] — public
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const member = await prisma.teamMember.findUnique({ where: { id: Number(id) } });
    if (!member) return NextResponse.json({ message: 'Not found' }, { status: 404 });
    return NextResponse.json({ ...member, bio: member.bio ? JSON.parse(member.bio) : [] });
  } catch (error) {
    console.error('GET /api/studio/[id] error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

// PUT /api/studio/[id] — protected
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const actor = verifyAuth(req);
  if (!actor || actor.role !== 'admin') return unauthorized();

  const { id } = await params;
  try {
    const existing = await prisma.teamMember.findUnique({ where: { id: Number(id) } });
    if (!existing) return NextResponse.json({ message: 'Not found' }, { status: 404 });

    const { name, role, bio, image, order, active } = await req.json();

    const updated = await prisma.teamMember.update({
      where: { id: Number(id) },
      data: {
        name: name ?? existing.name,
        role: role ?? existing.role,
        bio: bio !== undefined ? JSON.stringify(bio) : existing.bio,
        image: image !== undefined ? image : existing.image,
        order: order !== undefined ? Number(order) : existing.order,
        active: active !== undefined ? active : existing.active,
      },
    });
    return NextResponse.json({ ...updated, bio: updated.bio ? JSON.parse(updated.bio) : [] });
  } catch (error) {
    console.error('PUT /api/studio/[id] error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

// DELETE /api/studio/[id] — protected
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const actor = verifyAuth(req);
  if (!actor || actor.role !== 'admin') return unauthorized();

  const { id } = await params;
  try {
    await prisma.teamMember.delete({ where: { id: Number(id) } });
    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error('DELETE /api/studio/[id] error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
