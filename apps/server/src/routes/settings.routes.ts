import { Router } from 'express';
import { getSettings, updateSettings } from '../controllers/settings.controller';
import { authenticateToken, requireAdmin } from '../middleware/auth.middleware';

const router = Router();

router.get('/', getSettings);
router.put('/', authenticateToken, requireAdmin, updateSettings);

export default router;
