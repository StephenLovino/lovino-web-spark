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

// Configuration for screenshot capture
const config = {
  viewport: { width: 1280, height: 800 },
  timeout: 60000,
  waitTime: 3000, // Wait time for animations/loading
  quality: 90,
  retries: 2
};

// List of websites to capture with metadata
const websites = [
  { 
    url: 'https://launchpad-website-craft.vercel.app/', 
    filename: 'launchpad.jpg',
    name: 'DevCraft'
  },
  { 
    url: 'https://image-source-finder.vercel.app/', 
    filename: 'image-source-finder.jpg',
    name: 'Source Finder'
  },
  { 
    url: 'https://timepiece.site/', 
    filename: 'timepiece.jpg',
    name: 'Timepiece'
  },
  { 
    url: 'https://aha-innovations.com/', 
    filename: 'aha-innovations.jpg',
    name: 'AHA Innovations'
  },
  { 
    url: 'https://www.millennialbusinessinnovations.com/', 
    filename: 'millennial.jpg',
    name: 'Millennial Business Innovations'
  },
  { 
    url: 'http://rrtwins.com/', 
    filename: 'rrtwins.jpg',
    name: 'RR Twins'
  },
  { 
    url: 'http://undertakeph.com/', 
    filename: 'undertake.jpg',
    name: 'Undertake PH'
  },
  { 
    url: 'https://vidrec-coral.vercel.app/', 
    filename: 'vidrec.jpg',
    name: 'VidRec'
  },
  { 
    url: 'https://workwise-eosin.vercel.app/', 
    filename: 'workwise.jpg',
    name: 'WorkWise'
  }
];

async function captureScreenshotWithRetry(page, site, retries = config.retries) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`Capturing ${site.name} (${site.url}) - Attempt ${attempt}/${retries}...`);
      
      // Navigate to the page
      await page.goto(site.url, { 
        waitUntil: 'networkidle2',
        timeout: config.timeout
      });
      
      // Wait for animations and dynamic content to load
      await new Promise(resolve => setTimeout(resolve, config.waitTime));
      
      // Take screenshot of the hero section (viewport only)
      const screenshotPath = path.join(projectsDir, site.filename);
      await page.screenshot({
        path: screenshotPath,
        fullPage: false,
        quality: config.quality,
        type: 'jpeg'
      });
      
      console.log(`✅ Successfully captured ${site.name}`);
      return true;
    } catch (error) {
      console.error(`❌ Attempt ${attempt} failed for ${site.name}: ${error.message}`);
      if (attempt === retries) {
        console.error(`🚫 All attempts failed for ${site.name}`);
        return false;
      }
      // Wait before retry
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  return false;
}

async function updateAllScreenshots() {
  const startTime = Date.now();
  console.log('🚀 Starting automated screenshot update...');
  console.log(`📅 Timestamp: ${new Date().toISOString()}`);
  
  const browser = await puppeteer.launch({
    headless: 'new',
    defaultViewport: config.viewport,
    args: ['--no-sandbox', '--disable-setuid-sandbox'] // For better compatibility
  });

  const results = {
    successful: [],
    failed: []
  };

  try {
    const page = await browser.newPage();
    
    // Set user agent to avoid bot detection
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    
    for (const site of websites) {
      const success = await captureScreenshotWithRetry(page, site);
      if (success) {
        results.successful.push(site.name);
      } else {
        results.failed.push(site.name);
      }
    }
    
    await page.close();
  } catch (error) {
    console.error('🚫 Critical error during screenshot capture:', error);
  } finally {
    await browser.close();
  }

  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);
  
  console.log('\n📊 Screenshot Update Summary:');
  console.log(`⏱️  Duration: ${duration} seconds`);
  console.log(`✅ Successful: ${results.successful.length}/${websites.length}`);
  console.log(`❌ Failed: ${results.failed.length}/${websites.length}`);
  
  if (results.successful.length > 0) {
    console.log(`\n🎉 Successfully updated: ${results.successful.join(', ')}`);
  }
  
  if (results.failed.length > 0) {
    console.log(`\n⚠️  Failed to update: ${results.failed.join(', ')}`);
  }
  
  console.log('\n🏁 Screenshot update complete!');
  
  // Return results for potential use by other scripts
  return results;
}

// Run the update if this script is executed directly
updateAllScreenshots().catch(console.error);

export { updateAllScreenshots, websites, config };
