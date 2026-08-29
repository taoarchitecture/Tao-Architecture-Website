import { NextRequest } from 'next/server';
import { proxyToServer } from '@/lib/proxyToServer';

// GET /api/observability/status — protected admin
export async function GET(req: NextRequest) {
  return proxyToServer(req, '/api/observability/status');
}
