import { Router } from 'express';
import { getSettings, updateSettings } from '../controllers/settingsController';
import { requireAuth } from '../middleware/auth';

const router = Router();

// GET /api/settings (Public)
router.get('/', getSettings);

// PUT /api/settings (Protected)
router.put('/', requireAuth, updateSettings);

export default router;
