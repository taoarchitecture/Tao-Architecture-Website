import { NextRequest } from 'next/server';
import { proxyToServer } from '@/lib/proxyToServer';

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return proxyToServer(req, `/api/pages/${slug}`);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return proxyToServer(req, `/api/pages/${slug}`);
}
