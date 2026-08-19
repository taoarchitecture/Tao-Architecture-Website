import { NextRequest } from 'next/server';
import { proxyToServer } from '@/lib/proxyToServer';

export async function GET(req: NextRequest) {
  return proxyToServer(req, '/api/home-grid');
}
