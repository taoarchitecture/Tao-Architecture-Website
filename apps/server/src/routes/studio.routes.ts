import { Router } from 'express';
import { upload } from '../middleware/upload.middleware';
import * as StudioController from '../controllers/studio.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

// Team Members
router.get('/team', StudioController.getTeamMembers);
router.post('/team', authenticateToken, upload.single('image'), StudioController.createTeamMember);
router.put('/team/:id', authenticateToken, upload.single('image'), StudioController.updateTeamMember);
router.delete('/team/:id', authenticateToken, StudioController.deleteTeamMember);

export default router;
