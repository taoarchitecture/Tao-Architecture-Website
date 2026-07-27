import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

export interface JwtPayload {
  id: number;
  email: string;
  role: string;
}

/**
 * Verifies the Authorization Bearer token from a request.
 * Returns the decoded payload or null if invalid/missing.
 */
export function verifyAuth(req: NextRequest): JwtPayload | null {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
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
