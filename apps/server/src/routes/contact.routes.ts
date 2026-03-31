import { Router } from 'express';
import { submitContact, getContactSubmissions, deleteContactSubmission } from '../controllers/contact.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

router.post('/', submitContact);
router.get('/', authenticateToken, getContactSubmissions);
router.delete('/:id', authenticateToken, deleteContactSubmission);

export default router;
