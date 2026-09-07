import { Router } from 'express';
import { handleUpload } from '../controllers/uploadController';
import { requireAuth } from '../middleware/auth';
import { upload } from '../middleware/upload';

const router = Router();

// POST /api/upload (Protected, multer 5MB limit, Cloudinary + dev fallback)
router.post('/', requireAuth, upload.single('file'), handleUpload);

export default router;
