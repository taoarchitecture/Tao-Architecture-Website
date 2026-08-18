import { NextRequest } from 'next/server';
import { proxyToServer } from '@/lib/proxyToServer';

// GET /api/settings — public
export async function GET(req: NextRequest) {
  return proxyToServer(req, '/api/settings');
}

// PUT /api/settings — protected admin
export async function PUT(req: NextRequest) {
  return proxyToServer(req, '/api/settings');
}
