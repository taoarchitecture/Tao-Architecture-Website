import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { login, register, me, changePassword } from '../controllers/auth.controller';
import { authenticateToken, requireAdmin } from '../middleware/auth.middleware';
import { validateBody } from '../middleware/validate.middleware';
import { changePasswordSchema } from '../schemas/auth.schemas';

const router = Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  // A long-running local dev server shares one in-memory bucket across every
  // login attempt anyone makes against it — a real 5/15min cap there locks
  // everyone out after a handful of test logins, long before production's
  // per-serverless-instance limiter would ever realistically trigger.
  limit: process.env.NODE_ENV === 'production' ? 5 : 1000,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many login attempts. Please try again later.' },
});

router.post('/login', loginLimiter, login);
router.get('/me', authenticateToken, me);
router.put('/password', authenticateToken, validateBody(changePasswordSchema), changePassword);
router.post('/register', authenticateToken, requireAdmin, register);

export default router;
