import express from 'express';
import { getProjects, getProjectById, getProjectBySlug, createProject, updateProject, deleteProject } from '../controllers/project.controller';
import { upload } from '../middleware/upload.middleware';
import { authenticateToken } from '../middleware/auth.middleware';
import { validateBody } from '../middleware/validate.middleware';
import { createProjectSchema, updateProjectSchema } from '../schemas/project.schemas';

const router = express.Router();

router.get('/', getProjects);
router.get('/slug/:slug', getProjectBySlug);
router.get('/:id', getProjectById);

const uploadFields = upload.fields([
  { name: 'coverImage', maxCount: 1 },
  { name: 'gallery', maxCount: 20 }
]);

router.post('/', authenticateToken, uploadFields, validateBody(createProjectSchema), createProject);
router.put('/:id', authenticateToken, uploadFields, validateBody(updateProjectSchema), updateProject);
router.delete('/:id', authenticateToken, deleteProject);

export default router;
