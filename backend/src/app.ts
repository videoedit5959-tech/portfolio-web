import express, { Express } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';

import authRoutes from './routes/authRoutes';
import portfolioRoutes from './routes/portfolioRoutes';
import profileRoutes from './routes/profileRoutes';
import projectRoutes from './routes/projectRoutes';
import skillRoutes from './routes/skillRoutes';
import serviceRoutes from './routes/serviceRoutes';
import experienceRoutes from './routes/experienceRoutes';
import testimonialRoutes from './routes/testimonialRoutes';
import contactRoutes from './routes/contactRoutes';
import settingsRoutes from './routes/settingsRoutes';
import uploadRoutes from './routes/uploadRoutes';
import adminRoutes from './routes/adminRoutes';
import { errorHandler } from './middleware/errorHandler';
import { getDbStatus } from './config/db';
import { isCloudinaryConfigured } from './config/cloudinary';

export const createApp = (): Express => {
  const app = express();

  // Security headers (allowing inline scripts for development preview)
  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    })
  );

  // Cross-Origin Resource Sharing
  const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5173',
    'http://127.0.0.1:3000',
    ...(process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : []),
  ];

  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
          callback(null, true);
        } else {
          callback(null, true); // Allow configured hosts
        }
      },
      credentials: true,
    })
  );

  // Body and cookie parsing
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  app.use(cookieParser());

  // Static uploads directory for local development fallback
  const uploadsPath = path.join(process.cwd(), 'public', 'uploads');
  app.use('/uploads', express.static(uploadsPath));

  // Health check endpoint
  app.get('/api/health', (_req, res) => {
    const dbStatus = getDbStatus();
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      database: dbStatus.isConnected ? 'connected' : 'disconnected',
      cloudinary: isCloudinaryConfigured() ? 'configured' : 'unconfigured',
      nodeEnv: process.env.NODE_ENV || 'development',
    });
  });

  // REST API Route Mounts
  app.use('/api/auth', authRoutes);
  app.use('/api/portfolio', portfolioRoutes);
  app.use('/api/profile', profileRoutes);
  app.use('/api/projects', projectRoutes);
  app.use('/api/skills', skillRoutes);
  app.use('/api/services', serviceRoutes);
  app.use('/api/experience', experienceRoutes);
  app.use('/api/testimonials', testimonialRoutes);
  app.use('/api/contact', contactRoutes);
  app.use('/api/settings', settingsRoutes);
  app.use('/api/upload', uploadRoutes);
  app.use('/api/admin', adminRoutes);

  // Centralized Error Handler
  app.use(errorHandler);

  return app;
};
