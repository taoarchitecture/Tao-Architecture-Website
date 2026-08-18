import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_TOKEN_COOKIE } from '@/lib/auth';
import { checkRateLimit, getClientIp } from '@/lib/rateLimit';

const LOGIN_LIMIT = 5;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;

function getServerBaseUrl(): string {
  return (
    process.env.SERVER_INTERNAL_URL ||
    (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/api\/?$/, '') ||
    'http://localhost:5000'
  );
}

// Credential verification now lives only in Express (apps/server) — this route's
// job is just rate limiting and turning a successful login into the httpOnly
// cookie the admin UI relies on, which only makes sense at this (Next.js) layer.
export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  if (!checkRateLimit(`login:${ip}`, LOGIN_LIMIT, LOGIN_WINDOW_MS)) {
    return NextResponse.json(
      { message: 'Too many login attempts. Please try again later.' },
      { status: 429 }
    );
  }

  const bodyText = await req.text();

  let upstream: Response;
  try {
    upstream = await fetch(`${getServerBaseUrl()}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: bodyText,
    });
  } catch (error) {
    console.error('Login proxy error:', error);
    return NextResponse.json({ message: 'Upstream server error' }, { status: 502 });
  }

  const data = await upstream.json().catch(() => null);
  const response = NextResponse.json(data ?? { message: 'Server error' }, {
    status: upstream.status,
  });

  if (upstream.ok && data?.token) {
    response.cookies.set(ADMIN_TOKEN_COOKIE, data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day, matching the JWT's own expiry
    });
  }

  return response;
}
