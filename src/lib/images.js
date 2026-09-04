/**
 * Central media-asset URL helper.
 *
 * In development (Base44 preview) assets load from the Base44 CDN so the
 * preview works without downloading anything. In production builds the
 * same assets resolve to local /images/ and /videos/ paths — the
 * prebuild step (scripts/fetch-images.js) downloads them into public/
 * so Vite bundles them into dist/ for FTP deployment.
 * 
 * Production images are converted to WebP format for better performance.
 */
const DEV_IMAGE_BASE = 'https://media.base44.com/images/public/6a7e5db2c2620868d1046179/';
const DEV_VIDEO_BASE = 'https://media.base44.com/videos/public/6a7e5db2c2620868d1046179/';

export const IMAGE_BASE = import.meta.env.DEV ? DEV_IMAGE_BASE : '/images/';
export const VIDEO_BASE = import.meta.env.DEV ? DEV_VIDEO_BASE : '/videos/';

/**
 * Convert image filename to WebP in production
 */
const toWebP = (filename) => {
  if (import.meta.env.DEV) return filename;
  // Replace .jpg, .jpeg, .png with .webp
  return filename.replace(/\.(jpe?g|png)$/i, '.webp');
};

export const imageUrl = (filename) => IMAGE_BASE + toWebP(filename);
export const videoUrl = (filename) => VIDEO_BASE + filename;