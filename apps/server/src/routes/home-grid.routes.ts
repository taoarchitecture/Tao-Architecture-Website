import { Router } from 'express';
import { getHomeGridItems, updateHomeGridItem } from '../controllers/home-grid.controller';
import { authenticateToken, requireAdmin } from '../middleware/auth.middleware';

const router = Router();

router.get('/', getHomeGridItems);
router.put('/:slotKey', authenticateToken, requireAdmin, updateHomeGridItem);

export default router;
