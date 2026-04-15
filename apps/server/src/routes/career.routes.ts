import { Router } from 'express';
import { submitApplication, getApplications, getApplicationById } from '../controllers/career.controller';
import { upload } from '../middleware/upload.middleware';
import { authenticateToken } from '../middleware/auth.middleware';
import { validateBody } from '../middleware/validate.middleware';
import { submitApplicationSchema } from '../schemas/career.schemas';

const router = Router();

router.post(
  '/submit',
  upload.fields([
    { name: 'resume', maxCount: 1 },
    { name: 'salarySlip', maxCount: 1 },
    { name: 'portfolio', maxCount: 1 },
    { name: 'refLetter', maxCount: 1 },
  ]),
  validateBody(submitApplicationSchema),
  submitApplication
);

router.get('/', authenticateToken, getApplications);
router.get('/:id', authenticateToken, getApplicationById);

export default router;
