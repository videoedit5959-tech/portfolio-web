import { Router } from 'express';
import {
  getExperience,
  createExperience,
  updateExperience,
  deleteExperience,
} from '../controllers/experienceController';
import { requireAuth } from '../middleware/auth';

const router = Router();

// GET /api/experience (Public)
router.get('/', getExperience);

// Admin Routes (Protected)
router.post('/', requireAuth, createExperience);
router.put('/:id', requireAuth, updateExperience);
router.delete('/:id', requireAuth, deleteExperience);

export default router;
