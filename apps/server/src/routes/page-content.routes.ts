import { Router } from 'express';
import {
  getAllPageContent,
  getPageContentBySlug,
  upsertPageContent,
  deletePageContent,
} from '../controllers/page-content.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

router.get('/', getAllPageContent);
router.get('/:slug', getPageContentBySlug);
router.put('/', authenticateToken, upsertPageContent);
router.delete('/:slug', authenticateToken, deletePageContent);

export default router;
