import { NextRequest } from 'next/server';

// Lightweight in-memory, per-instance rate limiter. On Vercel's serverless
// runtime each warm instance keeps its own counts (no shared store), so this
// isn't a perfect distributed limiter — but it costs no extra infrastructure
// and meaningfully throttles the common case of repeated requests hitting the
// same warm instance, which is a real improvement over no limiting at all.
const hits = new Map<string, { count: number; resetAt: number }>();

export function getClientIp(req: NextRequest): string {
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) return forwardedFor.split(',')[0].trim();
  return req.headers.get('x-real-ip') || 'unknown';
}

/**
 * Returns true if the request should be allowed, false if it's over the limit.
 */
export function checkRateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || now > entry.resetAt) {
    hits.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= limit) {
    return false;
  }

  entry.count += 1;
  return true;
}
