import { Router } from 'express';
import { login, register } from '../controllers/auth.controller';
import { authenticateToken, requireAdmin } from '../middleware/auth.middleware';

const router = Router();

router.post('/login', login);
router.post('/register', authenticateToken, requireAdmin, register);

export default router;
