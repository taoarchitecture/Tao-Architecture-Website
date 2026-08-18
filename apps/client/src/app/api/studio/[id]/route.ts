import { NextRequest } from 'next/server';
import { proxyToServer } from '@/lib/proxyToServer';

// Note the path remap: Express nests team members under /api/studio/team/:id.
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return proxyToServer(req, `/api/studio/team/${id}`);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return proxyToServer(req, `/api/studio/team/${id}`);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return proxyToServer(req, `/api/studio/team/${id}`);
}
