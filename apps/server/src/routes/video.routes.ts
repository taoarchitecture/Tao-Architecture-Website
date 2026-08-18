import { Router, Request, Response, NextFunction } from 'express';
import { getVideo, listVideos, syncAll } from '../controllers/video.controller';

const router = Router();

// Shared secret used by the automated Vercel Cron proxy (apps/client's
// /api/cron/sync-videos route). Fails closed: an unconfigured CRON_SECRET
// denies the request rather than silently making this endpoint public.
const requireCronSecret = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  next();
};

router.get('/', listVideos);
router.get('/:id', getVideo);
router.post('/sync', requireCronSecret, syncAll);

export default router;
