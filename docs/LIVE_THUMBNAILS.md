# Live Thumbnail System

This portfolio uses an automated screenshot capture system to keep project thumbnails up-to-date with the live websites.

## How It Works

Instead of manually updating screenshots every time you make changes to your live projects, this system automatically:

1. **Crawls your live websites** using Puppeteer (headless Chrome)
2. **Captures hero section screenshots** at 1280x800 resolution
3. **Saves them as optimized JPEG images** in `/public/projects/`
4. **Updates automatically** on a schedule or when triggered manually

## Benefits

- ✅ **Always Current**: Thumbnails automatically reflect your latest website changes
- ✅ **Consistent Quality**: All screenshots use the same viewport size and settings
- ✅ **Zero Manual Work**: No need to manually take and upload screenshots
- ✅ **Professional Look**: High-quality, consistent thumbnails across all projects

## Usage

### Manual Update
Run this command to update all screenshots immediately:
```bash
npm run update-screenshots
```

### Automatic Updates
The system runs automatically:
- **Weekly**: Every Sunday at 2 AM UTC via GitHub Actions
- **On Changes**: When screenshot scripts are modified
- **Manual Trigger**: Can be triggered manually from GitHub Actions tab

## Configuration

### Adding New Projects
To add a new project to the screenshot system:

1. **Update the websites array** in `scripts/auto-update-screenshots.js`:
```javascript
{
  url: 'https://your-new-project.com/',
  filename: 'your-project.jpg',
  name: 'Your Project Name'
}
```

2. **Add the project** to your portfolio in `src/pages/Index.tsx`:
```javascript
<FeaturedProject
  title="Your Project Name"
  // ... other props
  image="/projects/your-project.jpg"
  liveUrl="https://your-new-project.com/"
/>
```

3. **Run the update**:
```bash
npm run update-screenshots
```

### Customizing Screenshot Settings
Edit `scripts/auto-update-screenshots.js` to modify:
- **Viewport size**: Change `viewport: { width: 1280, height: 800 }`
- **Wait time**: Adjust `waitTime: 3000` for slower-loading sites
- **Quality**: Modify `quality: 90` (1-100)
- **Timeout**: Change `timeout: 60000` for slower sites

## Files Structure

```
scripts/
├── capture-screenshots.js      # Simple screenshot capture
├── auto-update-screenshots.js  # Advanced automated system
└── ...

.github/workflows/
└── update-screenshots.yml      # GitHub Actions automation

public/projects/
├── launchpad.jpg              # Auto-generated screenshots
├── vidrec.jpg
├── workwise.jpg
└── ...
```

## Troubleshooting

### Screenshots Not Updating
1. Check if the website is accessible
2. Increase the `waitTime` for slow-loading sites
3. Check browser console for errors
4. Verify the URL is correct

### GitHub Actions Failing
1. Check the Actions tab in your GitHub repository
2. Ensure the repository has write permissions
3. Check if Puppeteer dependencies are installed correctly

### Manual Fallback
If automation fails, you can always:
1. Take manual screenshots at 1280x800 resolution
2. Save them as JPEG files in `/public/projects/`
3. Use the same naming convention as defined in the scripts

## Current Projects

The system currently captures screenshots for:
- DevCraft (Launchpad)
- Source Finder
- Timepiece
- AHA Innovations
- Millennial Business Innovations
- RR Twins
- Undertake PH
- VidRec
- WorkWise

## Technical Details

- **Engine**: Puppeteer (headless Chrome)
- **Format**: JPEG with 90% quality
- **Resolution**: 1280x800 (16:10 aspect ratio)
- **Capture**: Hero section only (viewport, not full page)
- **Retry Logic**: 2 attempts per site with error handling
- **User Agent**: Modern Chrome to avoid bot detection
