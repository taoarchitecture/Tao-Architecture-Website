import { NextRequest } from 'next/server';
import { proxyToServer } from '@/lib/proxyToServer';

// GET /api/career — protected admin (Express: authenticateToken + requireAdmin)
export async function GET(req: NextRequest) {
  return proxyToServer(req, '/api/career');
}

// POST /api/career — public. Note the path remap: Express mounts public
// application submission at /api/career/submit, not bare /api/career.
export async function POST(req: NextRequest) {
  return proxyToServer(req, '/api/career/submit');
}
