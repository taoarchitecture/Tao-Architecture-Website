import { Router } from 'express';
import { upload } from '../middleware/upload.middleware';
import { getHomeConfig, updateHomeConfig } from '../controllers/home.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

router.get('/', getHomeConfig);
router.put('/', authenticateToken, upload.fields([{ name: 'heroSlides', maxCount: 10 }]), updateHomeConfig);

export default router;
