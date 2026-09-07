import { Router } from 'express';
import { getServices, createService, updateService, deleteService } from '../controllers/serviceController';
import { requireAuth } from '../middleware/auth';

const router = Router();

// GET /api/services (Public)
router.get('/', getServices);

// Admin Routes (Protected)
router.post('/', requireAuth, createService);
router.put('/:id', requireAuth, updateService);
router.delete('/:id', requireAuth, deleteService);

export default router;
