import { NextRequest } from 'next/server';
import { proxyToServer } from '@/lib/proxyToServer';

// GET /api/projects — public
export async function GET(req: NextRequest) {
  return proxyToServer(req, '/api/projects');
}

// POST /api/projects — protected admin
export async function POST(req: NextRequest) {
  return proxyToServer(req, '/api/projects');
}
