import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { login, register, me, changePassword } from '../controllers/auth.controller';
import { authenticateToken, requireAdmin } from '../middleware/auth.middleware';
import { validateBody } from '../middleware/validate.middleware';
import { changePasswordSchema } from '../schemas/auth.schemas';

const router = Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many login attempts. Please try again later.' },
});

router.post('/login', loginLimiter, login);
router.get('/me', authenticateToken, me);
router.put('/password', authenticateToken, validateBody(changePasswordSchema), changePassword);
router.post('/register', authenticateToken, requireAdmin, register);

export default router;
