import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth, unauthorized } from '@/lib/auth';
import { getObservabilityStatusPayload } from '../utils';

export async function GET(req: NextRequest) {
  const actor = verifyAuth(req);
  if (!actor || actor.role !== 'admin') return unauthorized();

  try {
    const payload = getObservabilityStatusPayload();
    return NextResponse.json(payload);
  } catch (error) {
    console.error('GET /api/observability/status error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
