import { NextRequest } from 'next/server';
import { proxyToServer } from '@/lib/proxyToServer';

// DELETE /api/contact/[id] — protected admin
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return proxyToServer(req, `/api/contact/${id}`);
}
