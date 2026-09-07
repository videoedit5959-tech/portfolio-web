import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Admin } from '../models/Admin';
import { AuthenticatedRequest } from '../middleware/auth';
import { getDbStatus } from '../config/db';

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        success: false,
        error: 'Email and password are required.',
      });
      return;
    }

    const cleanEmail = email.trim().toLowerCase();
    const dbStatus = getDbStatus();

    let adminUser = null;
    let isPasswordValid = false;

    if (dbStatus.isConnected) {
      // Find admin in real MongoDB
      adminUser = await Admin.findOne({ email: cleanEmail });
      if (adminUser) {
        isPasswordValid = await adminUser.comparePassword(password);
      }
    } else {
      // Development fallback if MONGODB_URI has not yet been provisioned
      const envEmail = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
      const envPass = process.env.ADMIN_PASSWORD || '';
      if (envEmail && cleanEmail === envEmail && envPass && password === envPass) {
        adminUser = {
          _id: 'env-admin-1',
          email: envEmail,
          name: 'Asif',
          role: 'admin',
        };
        isPasswordValid = true;
      }
    }

    if (!adminUser || !isPasswordValid) {
      res.status(401).json({
        success: false,
        error: 'Invalid credentials. Please verify your email and password.',
      });
      return;
    }

    // Update lastLogin if it's a real Mongoose document
    if (adminUser && typeof (adminUser as any).save === 'function') {
      (adminUser as any).lastLogin = new Date();
      await (adminUser as any).save();
    }

    // Generate real signed JWT token
    const jwtSecret = process.env.JWT_SECRET || 'default_dev_jwt_secret_change_in_production';
    const expiresIn = process.env.JWT_EXPIRES_IN || '7d';

    const payload = {
      id: adminUser._id.toString(),
      email: adminUser.email,
      role: 'admin',
    };

    const token = jwt.sign(payload, jwtSecret, { expiresIn } as any);

    // Set HTTP-only secure cookie
    const isProduction = process.env.NODE_ENV === 'production';
    res.cookie('token', token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'strict' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({
      success: true,
      token,
      user: {
        id: adminUser._id.toString(),
        email: adminUser.email,
        name: adminUser.name || 'Asif',
        role: 'admin',
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: 'An unexpected server error occurred during authentication.',
    });
  }
};

export const logout = (_req: Request, res: Response): void => {
  res.clearCookie('token', {
    httpOnly: true,
    sameSite: 'lax',
  });
  res.json({
    success: true,
    message: 'Logged out successfully.',
  });
};

export const getMe = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  if (!req.user) {
    res.status(401).json({
      success: false,
      error: 'Unauthorized: Session missing.',
    });
    return;
  }

  res.json({
    success: true,
    user: req.user,
  });
};
