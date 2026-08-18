import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import {
  submitApplication,
  getApplications,
  getApplicationById,
  approveApplication,
  rejectApplication,
  deleteApplication,
} from '../controllers/career.controller';
import { upload } from '../middleware/upload.middleware';
import { authenticateToken, requireAdmin } from '../middleware/auth.middleware';
import { validateBody } from '../middleware/validate.middleware';
import { submitApplicationSchema } from '../schemas/career.schemas';

const router = Router();

const submitLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many submissions. Please try again later.' },
});

router.post(
  '/submit',
  submitLimiter,
  upload.fields([
    { name: 'resume', maxCount: 1 },
    { name: 'salarySlip', maxCount: 1 },
    { name: 'portfolio', maxCount: 1 },
    { name: 'refLetter', maxCount: 1 },
  ]),
  validateBody(submitApplicationSchema),
  submitApplication
);

router.get('/', authenticateToken, requireAdmin, getApplications);
router.get('/:id', authenticateToken, requireAdmin, getApplicationById);
router.post('/:id/approve', authenticateToken, requireAdmin, approveApplication);
router.post('/:id/reject', authenticateToken, requireAdmin, rejectApplication);
router.delete('/:id', authenticateToken, requireAdmin, deleteApplication);

export default router;
