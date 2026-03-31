import { Router } from 'express';
import { upload } from '../middleware/upload.middleware';
import * as ServicesController from '../controllers/services.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

// Public: only active services
router.get('/', ServicesController.getServices);

// Admin: all services including inactive
router.get('/all', authenticateToken, ServicesController.getAllServices);
router.get('/:id', ServicesController.getServiceById);
router.post('/', authenticateToken, upload.single('image'), ServicesController.createService);
router.put('/:id', authenticateToken, upload.single('image'), ServicesController.updateService);
router.delete('/:id', authenticateToken, ServicesController.deleteService);

export default router;
