import { Router } from 'express';
import { getProfile, updateProfile } from '../controllers/profileController';
import { requireAuth } from '../middleware/auth';

const router = Router();

// GET /api/profile (Public)
router.get('/', getProfile);

// PUT /api/profile (Protected)
router.put('/', requireAuth, updateProfile);

export default router;
