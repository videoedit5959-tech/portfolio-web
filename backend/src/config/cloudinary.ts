import { v2 as cloudinary } from 'cloudinary';

export const isCloudinaryConfigured = (): boolean => {
  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
  return Boolean(CLOUDINARY_CLOUD_NAME && CLOUDINARY_API_KEY && CLOUDINARY_API_SECRET);
};

export const initCloudinary = () => {
  if (isCloudinaryConfigured()) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });
    console.log('☁️ Cloudinary SDK configured successfully.');
  } else {
    console.warn('⚠️ Cloudinary credentials missing. Server will use local disk storage fallback for uploads.');
  }
};

export { cloudinary };
