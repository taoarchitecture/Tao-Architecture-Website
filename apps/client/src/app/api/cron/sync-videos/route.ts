import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/cron/sync-videos
 * Called automatically by Vercel Cron every hour.
 * Protected by the CRON_SECRET env var — Vercel sets
 * the Authorization header automatically when invoking cron jobs.
 */
export async function GET(req: NextRequest) {
  // Verify the request is from Vercel Cron (or an authorised manual call).
  // Fails closed: an unconfigured CRON_SECRET denies the request rather than
  // silently making this endpoint public.
  const authHeader = req.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const serverUrl =
    process.env.SERVER_INTERNAL_URL ||
    'http://localhost:5000';

  try {
    const res = await fetch(`${serverUrl}/api/videos/sync`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // Allow up to 60 s for a full channel sync
      signal: AbortSignal.timeout(60_000),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('[Cron] Sync failed:', res.status, text);
      return NextResponse.json(
        { message: 'Sync request failed', status: res.status, detail: text },
        { status: 500 }
      );
    }

    const data = await res.json();
    console.log('[Cron] YouTube sync complete:', data);
    return NextResponse.json({ ok: true, syncedAt: new Date().toISOString(), ...data });
  } catch (err: any) {
    console.error('[Cron] Sync error:', err?.message);
    return NextResponse.json({ message: err?.message || 'Unknown error' }, { status: 500 });
  }
}
