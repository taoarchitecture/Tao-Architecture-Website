import { NextRequest, NextResponse } from 'next/server';

// Express (apps/server) is the single source of truth for authentication and
// data access. Every Next.js API route that used to talk to Prisma directly
// now forwards to the matching Express endpoint instead, so there is exactly
// one place that decides "is this request authorized" and "what does the
// database say" — see the Phase 5 consolidation notes in the remediation plan.
function getServerBaseUrl(): string {
  return (
    process.env.SERVER_INTERNAL_URL ||
    (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/api\/?$/, '') ||
    'http://localhost:5000'
  );
}

/**
 * Forward the incoming request to Express at `targetPath` (e.g. '/api/career/1/approve'),
 * passing through the Authorization header, method, and body unchanged, and returning
 * Express's status code and JSON body unchanged. `overrideMethod` lets a route accept one
 * HTTP verb from the browser (kept for backward compatibility) while calling Express with
 * the verb it actually expects (e.g. Next's POST /api/pages -> Express's PUT /api/pages).
 */
export async function proxyToServer(
  req: NextRequest,
  targetPath: string,
  overrideMethod?: string
): Promise<NextResponse> {
  const method = overrideMethod || req.method;
  const base = getServerBaseUrl();
  const url = `${base}${targetPath}${req.nextUrl.search}`;

  const headers: Record<string, string> = {};
  const auth = req.headers.get('authorization');
  if (auth) headers['Authorization'] = auth;

  const init: RequestInit = { method };

  if (method !== 'GET' && method !== 'HEAD') {
    const bodyText = await req.text();
    if (bodyText) {
      headers['Content-Type'] = req.headers.get('content-type') || 'application/json';
      init.body = bodyText;
    }
  }
  init.headers = headers;
  init.cache = 'no-store'; // Prevent Next.js from caching the proxy response

  try {
    const res = await fetch(url, init);
    const text = await res.text();
    return new NextResponse(text, {
      status: res.status,
      headers: { 'Content-Type': res.headers.get('content-type') || 'application/json' },
    });
  } catch (error) {
    console.error(`Proxy to ${url} failed:`, error);
    return NextResponse.json({ message: 'Upstream server error' }, { status: 502 });
  }
}
