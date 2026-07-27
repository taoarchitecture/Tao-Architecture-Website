import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth, unauthorized } from '@/lib/auth';
import { getWebAnalyticsOverviewPayload } from '../../utils';

export async function GET(req: NextRequest) {
  const actor = verifyAuth(req);
  if (!actor || actor.role !== 'admin') return unauthorized();

  try {
    const { searchParams } = new URL(req.url);
    const since = searchParams.get('since') || undefined;
    const until = searchParams.get('until') || undefined;
    
    const payload = await getWebAnalyticsOverviewPayload({ since, until });
    return NextResponse.json(payload);
  } catch (error: any) {
    console.error('GET /api/observability/web-analytics/overview error:', error);
    if (error.message === 'Vercel Web Analytics is not fully configured on the server.') {
      return NextResponse.json({
        message: error.message,
        missing: error.missing,
      }, { status: 503 });
    }
    return NextResponse.json({ message: error.message || 'Failed to query Vercel Web Analytics.' }, { status: 502 });
  }
}
