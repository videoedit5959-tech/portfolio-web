import { Router, Request, Response } from 'express';
import { initialProfile, initialProjects, initialSkills, initialServices, initialExperience, initialTestimonials, initialSiteSettings } from '../../src/data/defaultData';

const router = Router();

/**
 * GET /api/portfolio
 * Public endpoint to fetch all active portfolio datasets in one optimized payload
 */
router.get('/', (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: {
      profile: initialProfile,
      projects: initialProjects.filter((p) => p.status === 'Completed'),
      skills: initialSkills.filter((s) => s.isActive),
      services: initialServices.filter((s) => s.isActive),
      experience: initialExperience,
      testimonials: initialTestimonials.filter((t) => t.isActive),
      settings: initialSiteSettings,
    },
  });
});

/**
 * GET /api/projects/:slug
 * Retrieve detailed case study for a single project
 */
router.get('/projects/:slug', (req: Request, res: Response) => {
  const { slug } = req.params;
  const project = initialProjects.find((p) => p.slug === slug);

  if (!project) {
    res.status(404).json({
      success: false,
      error: 'Project not found.',
    });
    return;
  }

  res.json({
    success: true,
    data: project,
  });
});

export default router;
