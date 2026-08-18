import { NextRequest } from 'next/server';
import { proxyToServer } from '@/lib/proxyToServer';

// GET /api/services/[id] — public
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return proxyToServer(req, `/api/services/${id}`);
}

// PUT /api/services/[id] — protected admin
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return proxyToServer(req, `/api/services/${id}`);
}

// DELETE /api/services/[id] — protected admin
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return proxyToServer(req, `/api/services/${id}`);
}
