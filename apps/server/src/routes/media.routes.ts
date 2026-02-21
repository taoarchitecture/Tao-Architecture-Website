import { Router } from 'express';
import { upload } from '../middleware/upload.middleware';
import * as MediaController from '../controllers/media.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

// Publications
router.get('/publications', MediaController.getPublications);
router.post('/publications', authenticateToken, upload.single('image'), MediaController.createPublication);
router.put('/publications/:id', authenticateToken, upload.single('image'), MediaController.updatePublication);
router.delete('/publications/:id', authenticateToken, MediaController.deletePublication);

// Awards
router.get('/awards', MediaController.getAwards);
router.post('/awards', authenticateToken, upload.single('image'), MediaController.createAward);
router.put('/awards/:id', authenticateToken, upload.single('image'), MediaController.updateAward);
router.delete('/awards/:id', authenticateToken, MediaController.deleteAward);

export default router;
