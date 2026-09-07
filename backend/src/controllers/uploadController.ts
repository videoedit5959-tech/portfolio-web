import { Request, Response } from 'express';
import { uploadFileBuffer } from '../services/uploadService';

export const handleUpload = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({
        success: false,
        error: 'No file uploaded. Please select an image or document.',
      });
      return;
    }

    const folder = (req.body.folder as string) || 'asif_portfolio';

    const result = await uploadFileBuffer(
      req.file.buffer,
      req.file.originalname,
      req.file.mimetype,
      folder
    );

    res.json({
      success: true,
      message: result.isCloudinary
        ? 'File uploaded to Cloudinary successfully.'
        : 'File saved to local storage (Cloudinary fallback active).',
      url: result.url,
      publicId: result.publicId,
      isCloudinary: result.isCloudinary,
      bytes: result.bytes,
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'File upload failed.',
    });
  }
};
