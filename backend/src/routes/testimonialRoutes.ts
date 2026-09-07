import { Router } from 'express';
import {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from '../controllers/testimonialController';
import { requireAuth } from '../middleware/auth';

const router = Router();

// GET /api/testimonials (Public)
router.get('/', getTestimonials);

// Admin Routes (Protected)
router.post('/', requireAuth, createTestimonial);
router.put('/:id', requireAuth, updateTestimonial);
router.delete('/:id', requireAuth, deleteTestimonial);

export default router;
