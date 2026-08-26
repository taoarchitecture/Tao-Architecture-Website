import express from 'express';
import { getProjects, getProjectById, getProjectBySlug, createProject, updateProject, deleteProject } from '../controllers/project.controller';
import { upload } from '../middleware/upload.middleware';
import { authenticateToken, attachUserIfPresent, requireAdmin } from '../middleware/auth.middleware';
import { validateBody } from '../middleware/validate.middleware';
import { createProjectSchema, updateProjectSchema } from '../schemas/project.schemas';

const router = express.Router();

// Public, but an authenticated admin sees unpublished drafts too — see
// attachUserIfPresent and the `onlyPublished` handling in project.service.ts.
router.get('/', attachUserIfPresent, getProjects);
router.get('/slug/:slug', attachUserIfPresent, getProjectBySlug);
router.get('/:id', attachUserIfPresent, getProjectById);

const uploadFields = upload.fields([
  { name: 'coverImage', maxCount: 1 },
  { name: 'gallery', maxCount: 20 }
]);

router.post('/', authenticateToken, requireAdmin, uploadFields, validateBody(createProjectSchema), createProject);
router.put('/:id', authenticateToken, requireAdmin, uploadFields, validateBody(updateProjectSchema), updateProject);
router.delete('/:id', authenticateToken, requireAdmin, deleteProject);

export default router;
