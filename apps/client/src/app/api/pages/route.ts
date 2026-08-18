import { NextRequest } from 'next/server';
import { proxyToServer } from '@/lib/proxyToServer';

export async function GET(req: NextRequest) {
  return proxyToServer(req, '/api/pages');
}

// Next's POST is Express's PUT for this upsert-by-slug endpoint.
export async function POST(req: NextRequest) {
  return proxyToServer(req, '/api/pages', 'PUT');
}
