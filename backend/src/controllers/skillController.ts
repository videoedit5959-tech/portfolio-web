import { Request, Response } from 'express';
import { Skill } from '../models/Skill';
import { getDbStatus } from '../config/db';

export const getSkills = async (_req: Request, res: Response): Promise<void> => {
  try {
    const dbStatus = getDbStatus();
    if (!dbStatus.isConnected) {
      res.status(503).json({ success: false, error: 'Database unavailable.' });
      return;
    }

    const skills = await Skill.find().sort({ displayOrder: 1, createdAt: 1 });
    res.json({
      success: true,
      count: skills.length,
      data: skills,
    });
  } catch (error) {
    console.error('getSkills error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch skills.' });
  }
};

export const createSkill = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, category, level, iconName, displayOrder, isActive } = req.body;

    if (!name) {
      res.status(400).json({ success: false, error: 'Skill name is required.' });
      return;
    }

    const highest = await Skill.findOne().sort({ displayOrder: -1 }).select('displayOrder');
    const order = displayOrder ?? ((highest?.displayOrder ?? 0) + 1);

    const skill = await Skill.create({
      name,
      category: category || 'Frontend',
      level: level || 80,
      iconName: iconName || 'Code',
      displayOrder: order,
      isActive: isActive !== false,
    });

    res.status(201).json({
      success: true,
      message: 'Skill created successfully in MongoDB.',
      data: skill,
    });
  } catch (error) {
    console.error('createSkill error:', error);
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create skill.',
    });
  }
};

export const updateSkill = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updated = await Skill.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      res.status(404).json({ success: false, error: 'Skill not found.' });
      return;
    }

    res.json({
      success: true,
      message: 'Skill updated successfully.',
      data: updated,
    });
  } catch (error) {
    console.error('updateSkill error:', error);
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update skill.',
    });
  }
};

export const deleteSkill = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await Skill.findByIdAndDelete(id);

    if (!deleted) {
      res.status(404).json({ success: false, error: 'Skill not found.' });
      return;
    }

    res.json({
      success: true,
      message: 'Skill deleted successfully from MongoDB.',
    });
  } catch (error) {
    console.error('deleteSkill error:', error);
    res.status(500).json({ success: false, error: 'Failed to delete skill.' });
  }
};
