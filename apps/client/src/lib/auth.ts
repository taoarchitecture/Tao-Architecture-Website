import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export interface JwtPayload {
  id: number;
  email: string;
  role: string;
}

/**
 * Returns the configured JWT secret, or null if it isn't set. There is
 * intentionally no hardcoded fallback — signing or verifying tokens with a
 * known default string would let anyone forge an admin session.
 */
export function getJwtSecret(): string | null {
  return process.env.JWT_SECRET || null;
}

export const ADMIN_TOKEN_COOKIE = 'admin_token';

/**
 * Verifies the admin session. Checks the httpOnly cookie first (the primary,
 * XSS-resistant transport), then falls back to an Authorization Bearer header
 * — a harmless safety net, not a second storage mechanism the client relies on.
 * Returns the decoded payload or null if invalid/missing.
 */
export function verifyAuth(req: NextRequest): JwtPayload | null {
  const secret = getJwtSecret();
  if (!secret) {
    console.error('JWT_SECRET is not configured — refusing to verify any token.');
    return null;
  }

  const cookieToken = req.cookies.get(ADMIN_TOKEN_COOKIE)?.value;
  const authHeader = req.headers.get('authorization');
  const headerToken = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
  const token = cookieToken || headerToken;
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, secret) as JwtPayload;
    return decoded;
  } catch {
    return null;
  }
}

/**
 * Returns a 401 Unauthorized response.
 */
export function unauthorized(): NextResponse {
  return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
}
