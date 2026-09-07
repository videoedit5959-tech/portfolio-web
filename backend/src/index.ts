import dotenv from 'dotenv';
dotenv.config();

import { createApp } from './app';
import { connectDB } from './config/db';
import { initCloudinary } from './config/cloudinary';
import { seedInitialDatabase } from './services/adminSeed';

const PORT = process.env.PORT || 5000;

export const startStandaloneServer = async () => {
  // 1. Initialize Cloudinary SDK
  initCloudinary();

  // 2. Connect to MongoDB Atlas / Local Database
  await connectDB();

  // 3. Seed initial admin and verified truthful data
  await seedInitialDatabase();

  // 4. Initialize Express Application
  const app = createApp();

  const server = app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`🚀 Standalone Backend Server running at http://localhost:${PORT}`);
    console.log(`🛡️ Environment: ${process.env.NODE_ENV || 'development'}`);
  });

  return server;
};

if (process.env.RUN_STANDALONE_BACKEND === 'true') {
  startStandaloneServer().catch((err) => {
    console.error('Fatal Server Startup Error:', err);
    process.exit(1);
  });
}
