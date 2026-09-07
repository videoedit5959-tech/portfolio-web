import { Router, Request, Response } from 'express';
import { requireAuth } from '../middleware/auth';
import {
  Project,
  Skill,
  Service,
  Experience,
  Testimonial,
  ContactMessage,
} from '../models';
import { getDbStatus } from '../config/db';
import { isCloudinaryConfigured } from '../config/cloudinary';

const router = Router();

// Protect all /api/admin routes with JWT authentication middleware
router.use(requireAuth);

/**
 * GET /api/admin/dashboard-stats
 * Returns real operational metrics directly from MongoDB
 */
router.get('/dashboard-stats', async (_req: Request, res: Response) => {
  try {
    const dbStatus = getDbStatus();

    const [
      totalProjects,
      totalSkills,
      totalServices,
      totalExperience,
      totalTestimonials,
      totalMessages,
      unreadMessages,
    ] = await Promise.all([
      Project.countDocuments().catch(() => 0),
      Skill.countDocuments().catch(() => 0),
      Service.countDocuments().catch(() => 0),
      Experience.countDocuments().catch(() => 0),
      Testimonial.countDocuments().catch(() => 0),
      ContactMessage.countDocuments().catch(() => 0),
      ContactMessage.countDocuments({ isRead: false }).catch(() => 0),
    ]);

    res.json({
      success: true,
      data: {
        serverTime: new Date().toISOString(),
        nodeEnv: process.env.NODE_ENV || 'development',
        database: {
          connected: dbStatus.isConnected,
          host: dbStatus.host || 'unknown',
          name: dbStatus.name || 'unknown',
          error: dbStatus.error,
        },
        storage: {
          provider: isCloudinaryConfigured() ? 'Cloudinary (CDN)' : 'Local Disk Fallback',
          configured: isCloudinaryConfigured(),
        },
        counts: {
          projects: totalProjects,
          skills: totalSkills,
          services: totalServices,
          experience: totalExperience,
          testimonials: totalTestimonials,
          messages: totalMessages,
          unreadMessages,
        },
      },
    });
  } catch (error) {
    console.error('dashboard-stats error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch admin stats.' });
  }
});

export default router;
