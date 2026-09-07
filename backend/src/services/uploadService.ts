import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import { isCloudinaryConfigured } from '../config/cloudinary';

export interface UploadResult {
  url: string;
  publicId?: string;
  isCloudinary: boolean;
  format?: string;
  bytes?: number;
}

export const uploadFileBuffer = async (
  buffer: Buffer,
  originalName: string,
  mimetype: string,
  folder: string = 'asif_portfolio'
): Promise<UploadResult> => {
  // 1. Production Cloudinary Path
  if (isCloudinaryConfigured()) {
    return new Promise((resolve, reject) => {
      const resourceType = mimetype === 'application/pdf' ? 'raw' : 'image';

      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: resourceType,
        },
        (error, result?: UploadApiResponse) => {
          if (error || !result) {
            console.error('Cloudinary upload failure:', error);
            reject(new Error(error?.message || 'Cloudinary upload failed'));
            return;
          }

          resolve({
            url: result.secure_url,
            publicId: result.public_id,
            isCloudinary: true,
            format: result.format,
            bytes: result.bytes,
          });
        }
      );

      uploadStream.end(buffer);
    });
  }

  // 2. Local Development Fallback (When CLOUDINARY credentials are absent)
  console.warn(
    '⚠️ [Upload Fallback]: CLOUDINARY credentials not detected. Saving asset to local development directory.'
  );

  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const safeExtension = path.extname(originalName) || (mimetype.includes('png') ? '.png' : '.jpg');
  const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}${safeExtension}`;
  const filePath = path.join(uploadsDir, filename);

  await fs.promises.writeFile(filePath, buffer);

  return {
    url: `/uploads/${filename}`,
    isCloudinary: false,
    bytes: buffer.length,
  };
};
