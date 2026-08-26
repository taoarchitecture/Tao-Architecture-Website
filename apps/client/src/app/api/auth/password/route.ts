import { NextRequest } from 'next/server';
import { proxyToServer } from '@/lib/proxyToServer';

export async function PUT(req: NextRequest) {
  return proxyToServer(req, '/api/auth/password');
}
