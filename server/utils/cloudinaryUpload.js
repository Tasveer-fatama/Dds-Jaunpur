import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';

// Cloudinary config — .env se aata hai
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Buffer ko Cloudinary pe upload karo
 * @param {Buffer} buffer - File buffer (PDF, image, etc.)
 * @param {Object} options - Cloudinary upload options
 * @returns {Promise<Object>} - Cloudinary upload result (secure_url, public_id, etc.)
 */
export const uploadBufferToCloudinary = (buffer, options = {}) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'auto',
        folder: options.folder || 'dds-certificates',
        ...options,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

/**
 * Cloudinary se file delete karo public_id se
 * @param {string} publicId - Cloudinary public_id
 * @param {string} resourceType - 'image' | 'raw' (PDF ke liye 'raw')
 */
export const deleteFromCloudinary = async (publicId, resourceType = 'raw') => {
  try {
    if (!publicId) return;
    await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
  } catch (err) {
    console.warn('Cloudinary delete warning:', err.message);
  }
};

/**
 * Cloudinary URL se public_id extract karo
 * @param {string} url - Cloudinary secure_url
 * @returns {string|null}
 */
export const extractPublicId = (url) => {
  try {
    if (!url) return null;
    // URL format: https://res.cloudinary.com/<cloud>/raw/upload/v123/<folder>/<public_id>.pdf
    const parts = url.split('/');
    const uploadIndex = parts.indexOf('upload');
    if (uploadIndex === -1) return null;
    // version skip karo (v1234567)
    const afterUpload = parts.slice(uploadIndex + 1).filter(p => !p.match(/^v\d+$/));
    const withExt = afterUpload.join('/');
    // extension hata do
    return withExt.replace(/\.[^/.]+$/, '');
  } catch {
    return null;
  }
};