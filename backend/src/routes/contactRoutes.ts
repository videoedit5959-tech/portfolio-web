import { Router } from 'express';
import {
  submitContact,
  getMessages,
  toggleMessageRead,
  deleteMessage,
} from '../controllers/contactController';
import { requireAuth } from '../middleware/auth';
import { contactRateLimiter } from '../middleware/rateLimiter';

const router = Router();

// POST /api/contact (Public, rate-limited & persisted to MongoDB)
router.post('/', contactRateLimiter, submitContact);

// Admin Routes (Protected)
router.get('/', requireAuth, getMessages);
router.patch('/:id', requireAuth, toggleMessageRead);
router.delete('/:id', requireAuth, deleteMessage);

export default router;
