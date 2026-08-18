import { Router } from 'express';
import {
  getAllPageContent,
  getPageContentBySlug,
  upsertPageContent,
  deletePageContent,
} from '../controllers/page-content.controller';
import { authenticateToken, requireAdmin } from '../middleware/auth.middleware';

const router = Router();

router.get('/', authenticateToken, requireAdmin, getAllPageContent);
router.get('/:slug', getPageContentBySlug);
router.put('/', authenticateToken, requireAdmin, upsertPageContent);
router.delete('/:slug', authenticateToken, requireAdmin, deletePageContent);

export default router;
