import { NextRequest } from 'next/server';
import { proxyToServer } from '@/lib/proxyToServer';

// GET /api/projects/slug/[slug] — public
export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return proxyToServer(req, `/api/projects/slug/${slug}`);
}
