import { Router, Request, Response } from 'express';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth';

const router = Router();

/**
 * POST /api/auth/login
 * Administrator sign-in endpoint
 */
router.post('/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@asifdev.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin12345';

  if (!email || !password) {
    res.status(400).json({
      success: false,
      error: 'Please provide both email and password.',
    });
    return;
  }

  // Validate credentials against environment configuration
  if (email.toLowerCase().trim() === adminEmail.toLowerCase() && password === adminPassword) {
    // Generate stateless token
    const token = `asif_jwt_${Buffer.from(JSON.stringify({ email, time: Date.now() })).toString('base64')}`;

    res.json({
      success: true,
      token,
      user: {
        id: 'admin-1',
        email: adminEmail,
        name: 'Asif (Administrator)',
        role: 'admin',
      },
    });
    return;
  }

  res.status(401).json({
    success: false,
    error: 'Invalid email or password.',
  });
});

/**
 * GET /api/auth/verify
 * Verifies active session token
 */
router.get('/verify', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  res.json({
    success: true,
    user: req.user,
  });
});

export default router;
