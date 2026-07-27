import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyAuth, unauthorized } from '@/lib/auth';

// DELETE /api/contact/[id] — protected
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const actor = verifyAuth(req);
  if (!actor || actor.role !== 'admin') return unauthorized();

  const { id } = await params;
  try {
    await prisma.contactSubmission.delete({ where: { id: Number(id) } });
    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error('DELETE /api/contact/[id] error:', error);
    return NextResponse.json({ message: 'Error deleting submission' }, { status: 500 });
  }
}
