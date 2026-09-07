import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { createApp } from '../backend/src/app';
import { connectDB } from '../backend/src/config/db';
import { initCloudinary } from '../backend/src/config/cloudinary';
import { seedInitialDatabase } from '../backend/src/services/adminSeed';

dotenv.config();

const PORT = 3000;

async function startServer() {
  // 1. Initialize Cloudinary SDK configuration
  initCloudinary();

  // 2. Connect to real MongoDB
  await connectDB();

  // 3. Seed real initial admin and truthful verified portfolio data
  await seedInitialDatabase();

  // 4. Create fully configured Express Application with real API endpoints
  const app = createApp();

  // 5. Frontend serving: Vite dev middleware in development or dist/ in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Production MERN Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Server startup failed:', err);
});
