/**
 * Central media-asset URL helper.
 *
 * In development (Base44 preview) assets load from the Base44 CDN so the
 * preview works without downloading anything. In production builds the
 * same assets resolve to local /images/ and /videos/ paths — the
 * prebuild step (scripts/fetch-images.js) downloads them into public/
 * so Vite bundles them into dist/ for FTP deployment.
 */
const DEV_IMAGE_BASE = 'https://media.base44.com/images/public/6a7e5db2c2620868d1046179/';
const DEV_VIDEO_BASE = 'https://media.base44.com/videos/public/6a7e5db2c2620868d1046179/';

export const IMAGE_BASE = import.meta.env.DEV ? DEV_IMAGE_BASE : '/images/';
export const VIDEO_BASE = import.meta.env.DEV ? DEV_VIDEO_BASE : '/videos/';

export const imageUrl = (filename) => IMAGE_BASE + filename;
export const videoUrl = (filename) => VIDEO_BASE + filename;