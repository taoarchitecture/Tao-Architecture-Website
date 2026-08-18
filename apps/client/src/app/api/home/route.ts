import { NextRequest } from 'next/server';
import { proxyToServer } from '@/lib/proxyToServer';

// GET /api/home — public
export async function GET(req: NextRequest) {
  return proxyToServer(req, '/api/home');
}

// PUT /api/home — protected admin
export async function PUT(req: NextRequest) {
  return proxyToServer(req, '/api/home');
}
