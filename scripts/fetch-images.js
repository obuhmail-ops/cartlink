/**
 * Downloads all media assets (images + video) from Base44 CDN into public/
 * so they are bundled into the Vite build output and deployed via FTP.
 *
 * Run automatically as a prebuild step (npm run prebuild) and in CI.
 * Skips files that already exist locally for faster incremental builds.
 */
import { mkdir, writeFile, access } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const PUBLIC_IMAGES = join(ROOT, 'public', 'images');
const PUBLIC_VIDEOS = join(ROOT, 'public', 'videos');

const IMAGE_BASE = 'https://media.base44.com/images/public/6a7e5db2c2620868d1046179/';
const VIDEO_BASE = 'https://media.base44.com/videos/public/6a7e5db2c2620868d1046179/';

const IMAGES = [
  'bfc00a16b_generated_image.png',
  '628f37336_generated_image.png',
  '13db7f113_Gemini_Generated_Image_fx9qh6fx9qh6fx9q.jpeg',
  '5dde5f4ee_Untitleddesign.png',
  'fd255c606_A6700476.jpg',
  '457bf5afe_A6700589.jpg',
  '724153794_A6700476.jpg',
  '3512606ee_A6700589.jpg',
  '353f029f7_bestofflorida.webp',
  '1598156a8_Google-Reviews-1024x493.jpg',
  '7e17732d6_generated_image.png',
  '6acf6e567_generated_image.png',
  '7d3ec60b1_generated_image.png',
  '483bf8dfe_A6700446.jpg',
  '994b4db89_A6700433.jpg',
  '870ab5d59_A6700463.jpg',
  'fe7e0bdc3_A6700589.jpg',
  '06860f9d6_A6700571.jpg',
  '8cb09ab6b_A6700436.jpg',
  '10b0cb026_A6700563.jpg',
  '84d598afd_A6700476.jpg',
  '0a94efb3e_DSC00726.jpg',
  '0f429eb51_A6700438.jpg',
  '216240b28_A6700592.jpg',
  'd36b9813a_A6700569.jpg',
  '7f0f800c4_A6700596.jpg',
  '5272445ab_A6700411.jpg',
  'fa9f7a8c5_generated_image.png',
  '6b280111a_generated_image.png',
  'b4b242b62_generated_image.png',
  '995974be5_A6700571.jpg',
];

const VIDEOS = [
  'f22b7c6ba_gemini_generated_video_9fd05d99.mp4',
];

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function download(url, dest) {
  if (await exists(dest)) {
    console.log(`  ✓ exists, skipping  ${dest.replace(ROOT, '')}`);
    return;
  }
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed ${res.status} ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(dest, buf);
  console.log(`  ↓ downloaded        ${dest.replace(ROOT, '')}`);
}

async function main() {
  await mkdir(PUBLIC_IMAGES, { recursive: true });
  await mkdir(PUBLIC_VIDEOS, { recursive: true });

  console.log('\n🖼  Fetching images…');
  for (const file of IMAGES) {
    await download(IMAGE_BASE + file, join(PUBLIC_IMAGES, file));
  }

  console.log('\n🎬 Fetching videos…');
  for (const file of VIDEOS) {
    await download(VIDEO_BASE + file, join(PUBLIC_VIDEOS, file));
  }

  console.log('\n✅ All assets fetched.');
}

main().catch((err) => {
  console.error('\n❌ Fetch failed:', err.message);
  process.exit(1);
});