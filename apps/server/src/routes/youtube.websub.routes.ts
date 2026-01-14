import { Router } from 'express';
import crypto from 'crypto';

const router = Router();

router.get('/callback', (req, res) => {
  const challenge = (req.query['hub.challenge'] as string) || '';
  res.status(200).send(challenge);
});

router.post('/callback', (req, res) => {
  const secret = process.env.YOUTUBE_WEBSUB_SECRET || '';
  if (secret) {
    const sig = req.header('X-Hub-Signature') || '';
    const hmac = crypto.createHmac('sha1', secret).update((req as any).rawBody || '').digest('hex');
    const expected = `sha1=${hmac}`;
    if (sig !== expected) return res.status(401).end();
  }
  res.status(200).end();
});

export default router;
