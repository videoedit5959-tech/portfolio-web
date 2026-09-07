import { Request, Response } from 'express';
import { Service } from '../models/Service';
import { getDbStatus } from '../config/db';

export const getServices = async (_req: Request, res: Response): Promise<void> => {
  try {
    const dbStatus = getDbStatus();
    if (!dbStatus.isConnected) {
      res.status(503).json({ success: false, error: 'Database unavailable.' });
      return;
    }

    const services = await Service.find().sort({ displayOrder: 1 });
    res.json({
      success: true,
      count: services.length,
      data: services,
    });
  } catch (error) {
    console.error('getServices error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch services.' });
  }
};

export const createService = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, iconName, highlights, displayOrder, isActive } = req.body;

    if (!title || !description) {
      res.status(400).json({ success: false, error: 'Title and description are required.' });
      return;
    }

    const highest = await Service.findOne().sort({ displayOrder: -1 }).select('displayOrder');
    const order = displayOrder ?? ((highest?.displayOrder ?? 0) + 1);

    const service = await Service.create({
      title,
      description,
      iconName: iconName || 'Layers',
      highlights: highlights || [],
      displayOrder: order,
      isActive: isActive !== false,
    });

    res.status(201).json({
      success: true,
      message: 'Service created successfully in MongoDB.',
      data: service,
    });
  } catch (error) {
    console.error('createService error:', error);
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create service.',
    });
  }
};

export const updateService = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updated = await Service.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      res.status(404).json({ success: false, error: 'Service not found.' });
      return;
    }

    res.json({
      success: true,
      message: 'Service updated successfully.',
      data: updated,
    });
  } catch (error) {
    console.error('updateService error:', error);
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update service.',
    });
  }
};

export const deleteService = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await Service.findByIdAndDelete(id);

    if (!deleted) {
      res.status(404).json({ success: false, error: 'Service not found.' });
      return;
    }

    res.json({
      success: true,
      message: 'Service deleted successfully from MongoDB.',
    });
  } catch (error) {
    console.error('deleteService error:', error);
    res.status(500).json({ success: false, error: 'Failed to delete service.' });
  }
};
