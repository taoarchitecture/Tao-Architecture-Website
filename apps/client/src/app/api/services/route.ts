import { NextRequest } from 'next/server';
import { proxyToServer } from '@/lib/proxyToServer';

// GET /api/services — public (active only; Express returns fallback defaults
// without persisting them when none are configured yet)
export async function GET(req: NextRequest) {
  return proxyToServer(req, '/api/services');
}

// POST /api/services — protected admin
export async function POST(req: NextRequest) {
  return proxyToServer(req, '/api/services');
}
