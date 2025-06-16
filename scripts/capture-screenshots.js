import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create projects directory if it doesn't exist
const projectsDir = path.join(__dirname, '../public/projects');
if (!fs.existsSync(projectsDir)) {
  fs.mkdirSync(projectsDir, { recursive: true });
}

// List of websites to capture
const websites = [
  { url: 'https://launchpad-website-craft.vercel.app/', filename: 'launchpad.jpg' },
  { url: 'https://image-source-finder.vercel.app/', filename: 'image-source-finder.jpg' },
  { url: 'https://timepiece.site/', filename: 'timepiece.jpg' },
  { url: 'https://aha-innovations.com/', filename: 'aha-innovations.jpg' },
  { url: 'https://www.millennialbusinessinnovations.com/', filename: 'millennial.jpg' },
  { url: 'http://rrtwins.com/', filename: 'rrtwins.jpg' },
  { url: 'http://undertakeph.com/', filename: 'undertake.jpg' },
  { url: 'https://vidrec-coral.vercel.app/', filename: 'vidrec.jpg' },
  { url: 'https://workwise-eosin.vercel.app/', filename: 'workwise.jpg' }
];

async function captureScreenshots() {
  const browser = await puppeteer.launch({
    headless: 'new',
    defaultViewport: { width: 1280, height: 800 }
  });

  console.log('Starting screenshot capture...');

  for (const site of websites) {
    try {
      console.log(`Capturing ${site.url}...`);
      const page = await browser.newPage();
      
      // Set a timeout for navigation
      await page.goto(site.url, { 
        waitUntil: 'networkidle2',
        timeout: 60000 // 60 seconds timeout
      });
      
      // Wait a bit for any animations to complete
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Take screenshot of the hero section (viewport only)
      await page.screenshot({
        path: path.join(projectsDir, site.filename),
        fullPage: false,
        quality: 90,
        type: 'jpeg'
      });
      
      console.log(`Saved screenshot for ${site.url}`);
      await page.close();
    } catch (error) {
      console.error(`Error capturing ${site.url}:`, error.message);
    }
  }

  await browser.close();
  console.log('Screenshot capture complete!');
}

captureScreenshots().catch(console.error);
