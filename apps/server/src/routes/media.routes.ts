import { Router } from 'express';
import { upload } from '../middleware/upload.middleware';
import * as MediaController from '../controllers/media.controller';
import { authenticateToken, requireAdmin } from '../middleware/auth.middleware';

const router = Router();

// Publications
router.get('/publications', MediaController.getPublications);
router.post('/publications', authenticateToken, requireAdmin, upload.single('image'), MediaController.createPublication);
router.put('/publications/:id', authenticateToken, requireAdmin, upload.single('image'), MediaController.updatePublication);
router.delete('/publications/:id', authenticateToken, requireAdmin, MediaController.deletePublication);

// Awards
router.get('/awards', MediaController.getAwards);
router.post('/awards', authenticateToken, requireAdmin, upload.single('image'), MediaController.createAward);
router.put('/awards/:id', authenticateToken, requireAdmin, upload.single('image'), MediaController.updateAward);
router.delete('/awards/:id', authenticateToken, requireAdmin, MediaController.deleteAward);

export default router;
