import { NextRequest } from 'next/server';
import { proxyToServer } from '@/lib/proxyToServer';

// Express is the single source of truth for admin creation, including the
// ALLOW_ADMIN_REGISTRATION gate and the admin-role check.
export async function POST(req: NextRequest) {
  return proxyToServer(req, '/api/auth/register');
}
