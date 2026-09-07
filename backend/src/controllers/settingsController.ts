import { Request, Response } from 'express';
import { SiteSettings } from '../models/SiteSettings';
import { getDbStatus } from '../config/db';

export const getSettings = async (_req: Request, res: Response): Promise<void> => {
  try {
    const dbStatus = getDbStatus();
    if (!dbStatus.isConnected) {
      res.status(503).json({ success: false, error: 'Database unavailable.' });
      return;
    }

    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create({});
    }

    res.json({
      success: true,
      data: settings,
    });
  } catch (error) {
    console.error('getSettings error:', error);
    res.status(500).json({ success: false, error: 'Failed to retrieve site settings.' });
  }
};

export const updateSettings = async (req: Request, res: Response): Promise<void> => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = new SiteSettings(req.body);
    } else {
      Object.assign(settings, req.body);
    }

    await settings.save();

    res.json({
      success: true,
      message: 'Site settings updated successfully in MongoDB.',
      data: settings,
    });
  } catch (error) {
    console.error('updateSettings error:', error);
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update site settings.',
    });
  }
};
