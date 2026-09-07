import { Router, Request, Response } from 'express';
import {
  Profile,
  Project,
  Skill,
  Service,
  Experience,
  Testimonial,
  SiteSettings,
} from '../models';
import { getDbStatus } from '../config/db';

const router = Router();

/**
 * GET /api/portfolio
 * Unified public endpoint returning live MongoDB portfolio state
 */
router.get('/', async (_req: Request, res: Response) => {
  try {
    const dbStatus = getDbStatus();

    if (!dbStatus.isConnected) {
      res.status(503).json({
        success: false,
        error: 'Database connection offline. Please check MongoDB configuration.',
        dbStatus,
      });
      return;
    }

    const [
      profile,
      projects,
      skills,
      services,
      experience,
      testimonials,
      settings,
    ] = await Promise.all([
      Profile.findOne(),
      Project.find({ status: 'Completed' }).sort({ displayOrder: 1, createdAt: -1 }),
      Skill.find({ isActive: true }).sort({ displayOrder: 1, createdAt: 1 }),
      Service.find({ isActive: true }).sort({ displayOrder: 1 }),
      Experience.find().sort({ displayOrder: 1, createdAt: -1 }),
      Testimonial.find({ isActive: true }).sort({ createdAt: -1 }),
      SiteSettings.findOne(),
    ]);

    res.json({
      success: true,
      data: {
        profile: profile || null,
        projects: projects || [],
        skills: skills || [],
        services: services || [],
        experience: experience || [],
        testimonials: testimonials || [],
        settings: settings || null,
      },
    });
  } catch (error) {
    console.error('Portfolio aggregation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch public portfolio data.',
    });
  }
});

export default router;
