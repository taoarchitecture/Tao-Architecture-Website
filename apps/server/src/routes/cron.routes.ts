import { Router, Request, Response } from 'express';
import { fetchAndStoreAllVideos } from '../services/youtube.service';

const router = Router();

/**
 * GET /api/cron/sync-videos
 * Called automatically by Vercel Cron every hour.
 * Protected by CRON_SECRET env var — Vercel sets the Authorization header automatically.
 */
router.get('/sync-videos', async (req: Request, res: Response) => {
  const authHeader = req.headers['authorization'];
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const handle = process.env.YOUTUBE_CHANNEL_HANDLE || '@TAOSTUDIO_0';
  try {
    const result = await fetchAndStoreAllVideos(handle);
    console.log('[Cron] YouTube sync complete:', result);
    return res.json({ ok: true, syncedAt: new Date().toISOString(), ...result });
  } catch (err: any) {
    console.error('[Cron] Sync error:', err?.message);
    return res.status(500).json({ message: err?.message || 'Unknown sync error' });
  }
});

export default router;
