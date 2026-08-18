import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { submitContact, getContactSubmissions, deleteContactSubmission } from '../controllers/contact.controller';
import { authenticateToken, requireAdmin } from '../middleware/auth.middleware';

const router = Router();

const submitLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many submissions. Please try again later.' },
});

router.post('/', submitLimiter, submitContact);
router.get('/', authenticateToken, requireAdmin, getContactSubmissions);
router.delete('/:id', authenticateToken, requireAdmin, deleteContactSubmission);

export default router;
