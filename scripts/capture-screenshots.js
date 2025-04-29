const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Create projects directory if it doesn't exist
const projectsDir = path.join(__dirname, '../public/projects');
if (!fs.existsSync(projectsDir)) {
  fs.mkdirSync(projectsDir, { recursive: true });
}

// List of websites to capture
const websites = [
  { url: 'https://launchpad-website-craft.vercel.app/', filename: 'launchpad.png' },
  { url: 'https://image-source-finder.vercel.app/', filename: 'image-source-finder.png' },
  { url: 'https://timepiece.site/', filename: 'timepiece.png' },
  { url: 'https://aha-innovations.com/', filename: 'aha-innovations.png' },
  { url: 'https://millennialbusinessinnovations.com/', filename: 'millennial.png' },
  { url: 'http://rrtwins.com/', filename: 'rrtwins.png' },
  { url: 'http://undertakeph.com/', filename: 'undertake.png' }
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
      await page.waitForTimeout(2000);
      
      // Take screenshot
      await page.screenshot({
        path: path.join(projectsDir, site.filename),
        fullPage: false,
        quality: 90
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
