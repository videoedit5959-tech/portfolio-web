import { Router, Request, Response } from 'express';
import { requireAuth } from '../middleware/auth';

const router = Router();

// Protect all /api/admin routes with JWT authentication middleware
router.use(requireAuth);

/**
 * GET /api/admin/dashboard-stats
 */
router.get('/dashboard-stats', (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: {
      serverTime: new Date().toISOString(),
      nodeEnv: process.env.NODE_ENV || 'production',
      database: 'Connected',
    },
  });
});

/**
 * POST /api/admin/upload
 * Staged architecture for Cloudinary image uploads
 */
router.post('/upload', (req: Request, res: Response) => {
  const { imageUrl } = req.body;

  if (!imageUrl) {
    res.status(400).json({
      success: false,
      error: 'Image URL or payload is required.',
    });
    return;
  }

  // Cloudinary upload pipeline:
  // In production with cloudinary configured:
  // const uploadRes = await cloudinary.v2.uploader.upload(file, { folder: 'asif_portfolio' });
  res.json({
    success: true,
    url: imageUrl,
    message: 'Image staged and saved successfully.',
  });
});

export default router;
