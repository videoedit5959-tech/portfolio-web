import { Request, Response } from 'express';
import { Testimonial } from '../models/Testimonial';
import { getDbStatus } from '../config/db';

export const getTestimonials = async (_req: Request, res: Response): Promise<void> => {
  try {
    const dbStatus = getDbStatus();
    if (!dbStatus.isConnected) {
      res.status(503).json({ success: false, error: 'Database unavailable.' });
      return;
    }

    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: testimonials.length,
      data: testimonials,
    });
  } catch (error) {
    console.error('getTestimonials error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch testimonials.' });
  }
};

export const createTestimonial = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, position, company, avatarUrl, content, rating, isActive } = req.body;

    if (!name || !content) {
      res.status(400).json({ success: false, error: 'Name and testimonial content are required.' });
      return;
    }

    const testimonial = await Testimonial.create({
      name,
      position: position || '',
      company: company || '',
      avatarUrl: avatarUrl || '/images/profile-placeholder.svg',
      content,
      rating: rating || 5,
      isActive: isActive !== false,
    });

    res.status(201).json({
      success: true,
      message: 'Testimonial created successfully in MongoDB.',
      data: testimonial,
    });
  } catch (error) {
    console.error('createTestimonial error:', error);
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create testimonial.',
    });
  }
};

export const updateTestimonial = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updated = await Testimonial.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      res.status(404).json({ success: false, error: 'Testimonial not found.' });
      return;
    }

    res.json({
      success: true,
      message: 'Testimonial updated successfully.',
      data: updated,
    });
  } catch (error) {
    console.error('updateTestimonial error:', error);
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update testimonial.',
    });
  }
};

export const deleteTestimonial = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await Testimonial.findByIdAndDelete(id);

    if (!deleted) {
      res.status(404).json({ success: false, error: 'Testimonial not found.' });
      return;
    }

    res.json({
      success: true,
      message: 'Testimonial deleted successfully from MongoDB.',
    });
  } catch (error) {
    console.error('deleteTestimonial error:', error);
    res.status(500).json({ success: false, error: 'Failed to delete testimonial.' });
  }
};
