import { NextRequest } from 'next/server';
import { proxyToServer } from '@/lib/proxyToServer';

// Express is the single source of truth for the user table.
export async function GET(req: NextRequest) {
  return proxyToServer(req, '/api/auth/me');
}
