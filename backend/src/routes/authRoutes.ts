import { Router } from 'express';
import { login, logout, getMe } from '../controllers/authController';
import { requireAuth } from '../middleware/auth';
import { loginRateLimiter } from '../middleware/rateLimiter';

const router = Router();

// POST /api/auth/login (Rate-limited, real bcrypt + JWT)
router.post('/login', loginRateLimiter, login);

// POST /api/auth/logout (Clears session cookie)
router.post('/logout', logout);

// GET /api/auth/me (Protected, returns current session)
router.get('/me', requireAuth, getMe);

export default router;
