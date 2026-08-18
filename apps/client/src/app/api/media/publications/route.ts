import { NextRequest } from 'next/server';
import { proxyToServer } from '@/lib/proxyToServer';

// GET /api/media/publications — public
export async function GET(req: NextRequest) {
  return proxyToServer(req, '/api/media/publications');
}
