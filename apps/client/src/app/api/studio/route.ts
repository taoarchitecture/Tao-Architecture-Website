import { NextRequest } from 'next/server';
import { proxyToServer } from '@/lib/proxyToServer';

// Note the path remap: Express nests team members under /api/studio/team.
export async function GET(req: NextRequest) {
  return proxyToServer(req, '/api/studio/team');
}

export async function POST(req: NextRequest) {
  return proxyToServer(req, '/api/studio/team');
}
