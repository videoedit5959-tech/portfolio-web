import { Request, Response } from 'express';
import { Project } from '../models/Project';
import { getDbStatus } from '../config/db';

const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const getPublicProjects = async (_req: Request, res: Response): Promise<void> => {
  try {
    const dbStatus = getDbStatus();
    if (!dbStatus.isConnected) {
      res.status(503).json({
        success: false,
        error: 'Database offline: MongoDB connection required.',
      });
      return;
    }

    const projects = await Project.find({ status: 'Completed' }).sort({ displayOrder: 1, createdAt: -1 });

    res.json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    console.error('getPublicProjects error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch projects.' });
  }
};

export const getProjectBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;
    const project = await Project.findOne({ slug });

    if (!project) {
      res.status(404).json({
        success: false,
        error: `Project with slug '${slug}' not found.`,
      });
      return;
    }

    res.json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error('getProjectBySlug error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch project details.' });
  }
};

export const getAllProjectsAdmin = async (_req: Request, res: Response): Promise<void> => {
  try {
    const projects = await Project.find().sort({ displayOrder: 1, createdAt: -1 });
    res.json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    console.error('getAllProjectsAdmin error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch admin projects.' });
  }
};

export const createProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = req.body;

    if (!data.title) {
      res.status(400).json({ success: false, error: 'Project title is required.' });
      return;
    }

    let slug = data.slug ? generateSlug(data.slug) : generateSlug(data.title);

    // Check slug uniqueness
    const existing = await Project.findOne({ slug });
    if (existing) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    const highestOrder = await Project.findOne().sort({ displayOrder: -1 }).select('displayOrder');
    const displayOrder = data.displayOrder ?? ((highestOrder?.displayOrder ?? 0) + 1);

    const project = await Project.create({
      ...data,
      slug,
      displayOrder,
      type: data.type || 'Featured Personal Project',
      githubUrl: data.githubUrl || '',
      liveUrl: data.liveUrl || '',
      thumbnail: data.thumbnail || '/images/profile-placeholder.svg',
    });

    res.status(201).json({
      success: true,
      message: 'Project created successfully in MongoDB.',
      data: project,
    });
  } catch (error) {
    console.error('createProject error:', error);
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create project.',
    });
  }
};

export const updateProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (data.title && !data.slug) {
      data.slug = generateSlug(data.title);
    }

    const updated = await Project.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      res.status(404).json({ success: false, error: 'Project not found.' });
      return;
    }

    res.json({
      success: true,
      message: 'Project updated successfully.',
      data: updated,
    });
  } catch (error) {
    console.error('updateProject error:', error);
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update project.',
    });
  }
};

export const deleteProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await Project.findByIdAndDelete(id);

    if (!deleted) {
      res.status(404).json({ success: false, error: 'Project not found.' });
      return;
    }

    res.json({
      success: true,
      message: 'Project deleted successfully from MongoDB.',
    });
  } catch (error) {
    console.error('deleteProject error:', error);
    res.status(500).json({ success: false, error: 'Failed to delete project.' });
  }
};
