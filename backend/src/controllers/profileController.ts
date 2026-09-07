import { Request, Response } from 'express';
import { Profile } from '../models/Profile';
import { getDbStatus } from '../config/db';

export const getProfile = async (_req: Request, res: Response): Promise<void> => {
  try {
    const dbStatus = getDbStatus();
    if (!dbStatus.isConnected) {
      res.status(503).json({
        success: false,
        error: 'Database unavailable: MongoDB is not connected.',
        dbStatus,
      });
      return;
    }

    let profile = await Profile.findOne();
    if (!profile) {
      // Create default if none exists yet
      profile = await Profile.create({
        name: 'Asif',
        title: 'MERN Stack Web Developer',
        shortBio: 'I build modern, responsive and scalable web applications using React, Node.js, Express and MongoDB.',
        aboutText: 'I am a dedicated MERN Stack Web Developer passionate about building high-performance, responsive, and maintainable web applications.',
        philosophy: 'Code should be readable, architectures scalable, and user experiences intuitive.',
        email: 'asif.mern.dev@gmail.com',
        location: 'Dhaka, Bangladesh (Available Worldwide)',
        avatarUrl: '/images/profile-placeholder.svg',
        isAvailable: true,
      });
    }

    res.json({
      success: true,
      data: profile,
    });
  } catch (error) {
    console.error('getProfile error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve profile data from database.',
    });
  }
};

export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const dbStatus = getDbStatus();
    if (!dbStatus.isConnected) {
      res.status(503).json({
        success: false,
        error: 'Database unavailable: MongoDB is not connected.',
      });
      return;
    }

    let profile = await Profile.findOne();
    if (!profile) {
      profile = new Profile(req.body);
    } else {
      Object.assign(profile, req.body);
    }

    await profile.save();

    res.json({
      success: true,
      message: 'Profile updated successfully in MongoDB.',
      data: profile,
    });
  } catch (error) {
    console.error('updateProfile error:', error);
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update profile.',
    });
  }
};
