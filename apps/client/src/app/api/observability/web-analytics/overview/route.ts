import { NextRequest } from 'next/server';
import { proxyToServer } from '@/lib/proxyToServer';

// GET /api/observability/web-analytics/overview — protected admin
export async function GET(req: NextRequest) {
  return proxyToServer(req, '/api/observability/web-analytics/overview');
}
