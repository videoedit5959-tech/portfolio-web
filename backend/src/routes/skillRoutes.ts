import { Router } from 'express';
import { getSkills, createSkill, updateSkill, deleteSkill } from '../controllers/skillController';
import { requireAuth } from '../middleware/auth';

const router = Router();

// GET /api/skills (Public)
router.get('/', getSkills);

// Admin Routes (Protected)
router.post('/', requireAuth, createSkill);
router.put('/:id', requireAuth, updateSkill);
router.delete('/:id', requireAuth, deleteSkill);

export default router;
