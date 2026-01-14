import express from 'express';
import { getProjects, getProjectById, getProjectBySlug, createProject, updateProject, deleteProject } from '../controllers/project.controller';
import { upload } from '../middleware/upload.middleware';
import { authenticateToken } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/', getProjects);
router.get('/slug/:slug', getProjectBySlug);
router.get('/:id', getProjectById);

const uploadFields = upload.fields([
  { name: 'coverImage', maxCount: 1 },
  { name: 'gallery', maxCount: 20 }
]);

router.post('/', authenticateToken, uploadFields, createProject);
router.put('/:id', authenticateToken, uploadFields, updateProject);
router.delete('/:id', authenticateToken, deleteProject);

export default router;
