import { NextRequest, NextResponse } from 'next/server';
import { proxyToServer } from '@/lib/proxyToServer';
import { checkRateLimit, getClientIp } from '@/lib/rateLimit';

const SUBMIT_LIMIT = 5;
const SUBMIT_WINDOW_MS = 15 * 60 * 1000;

// POST /api/contact — public. This rate limit predates the Express migration
// and is unrelated to it, so it stays here even though Express is now the
// source of truth for persistence and the notification email.
export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  if (!checkRateLimit(`contact:${ip}`, SUBMIT_LIMIT, SUBMIT_WINDOW_MS)) {
    return NextResponse.json(
      { message: 'Too many submissions. Please try again later.' },
      { status: 429 }
    );
  }

  return proxyToServer(req, '/api/contact');
}

// GET /api/contact — protected admin
export async function GET(req: NextRequest) {
  return proxyToServer(req, '/api/contact');
}
