import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the icons directory exists
const iconsDir = path.join(__dirname, '../public/icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Source image
const sourceImage = path.join(__dirname, '../public/StephenLovino.png');

// Generate favicon.ico (16x16, 32x32, 48x48)
sharp(sourceImage)
  .resize(32, 32)
  .toFile(path.join(__dirname, '../public/favicon.ico'), (err) => {
    if (err) {
      console.error('Error generating favicon.ico:', err);
    } else {
      console.log('favicon.ico generated successfully');
    }
  });

// Generate PWA icons
const iconSizes = [192, 512];

iconSizes.forEach(size => {
  sharp(sourceImage)
    .resize(size, size)
    .toFile(path.join(iconsDir, `icon-${size}x${size}.png`), (err) => {
      if (err) {
        console.error(`Error generating ${size}x${size} icon:`, err);
      } else {
        console.log(`${size}x${size} icon generated successfully`);
      }
    });
});

console.log('Icon generation process started...');
