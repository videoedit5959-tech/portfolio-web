import { Request, Response } from 'express';
import { Experience } from '../models/Experience';
import { getDbStatus } from '../config/db';

export const getExperience = async (_req: Request, res: Response): Promise<void> => {
  try {
    const dbStatus = getDbStatus();
    if (!dbStatus.isConnected) {
      res.status(503).json({ success: false, error: 'Database unavailable.' });
      return;
    }

    const experiences = await Experience.find().sort({ displayOrder: 1, createdAt: -1 });
    res.json({
      success: true,
      count: experiences.length,
      data: experiences,
    });
  } catch (error) {
    console.error('getExperience error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch experience records.' });
  }
};

export const createExperience = async (req: Request, res: Response): Promise<void> => {
  try {
    const { company, position, startDate, endDate, isCurrent, description, technologies, displayOrder, type } = req.body;

    if (!company || !position || !startDate) {
      res.status(400).json({
        success: false,
        error: 'Company, position, and start date are required fields.',
      });
      return;
    }

    const highest = await Experience.findOne().sort({ displayOrder: -1 }).select('displayOrder');
    const order = displayOrder ?? ((highest?.displayOrder ?? 0) + 1);

    const record = await Experience.create({
      company,
      position,
      startDate,
      endDate: isCurrent ? '' : endDate,
      isCurrent: Boolean(isCurrent),
      description: description || '',
      technologies: technologies || [],
      displayOrder: order,
      type: type || 'Full-Time Employment',
    });

    res.status(201).json({
      success: true,
      message: 'Experience record created successfully in MongoDB.',
      data: record,
    });
  } catch (error) {
    console.error('createExperience error:', error);
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create experience record.',
    });
  }
};

export const updateExperience = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updated = await Experience.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      res.status(404).json({ success: false, error: 'Experience record not found.' });
      return;
    }

    res.json({
      success: true,
      message: 'Experience record updated successfully.',
      data: updated,
    });
  } catch (error) {
    console.error('updateExperience error:', error);
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update experience record.',
    });
  }
};

export const deleteExperience = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await Experience.findByIdAndDelete(id);

    if (!deleted) {
      res.status(404).json({ success: false, error: 'Experience record not found.' });
      return;
    }

    res.json({
      success: true,
      message: 'Experience record deleted successfully from MongoDB.',
    });
  } catch (error) {
    console.error('deleteExperience error:', error);
    res.status(500).json({ success: false, error: 'Failed to delete experience record.' });
  }
};
