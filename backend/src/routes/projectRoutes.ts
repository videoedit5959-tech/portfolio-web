import { Router } from 'express';
import {
  getPublicProjects,
  getProjectBySlug,
  getAllProjectsAdmin,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projectController';
import { requireAuth } from '../middleware/auth';

const router = Router();

// Public Routes
router.get('/', getPublicProjects);
router.get('/detail/:slug', getProjectBySlug);

// Admin Routes (Protected)
router.get('/admin/all', requireAuth, getAllProjectsAdmin);
router.post('/', requireAuth, createProject);
router.put('/:id', requireAuth, updateProject);
router.delete('/:id', requireAuth, deleteProject);

export default router;
