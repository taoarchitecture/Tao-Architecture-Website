import { Router } from 'express';
import { upload } from '../middleware/upload.middleware';
import * as ServicesController from '../controllers/services.controller';
import { authenticateToken, requireAdmin } from '../middleware/auth.middleware';

const router = Router();

// Public: only active services
router.get('/', ServicesController.getServices);

// Admin: all services including inactive
router.get('/all', authenticateToken, requireAdmin, ServicesController.getAllServices);
router.get('/:id', ServicesController.getServiceById);
router.post('/', authenticateToken, requireAdmin, upload.single('image'), ServicesController.createService);
router.put('/:id', authenticateToken, requireAdmin, upload.single('image'), ServicesController.updateService);
router.delete('/:id', authenticateToken, requireAdmin, ServicesController.deleteService);

export default router;
