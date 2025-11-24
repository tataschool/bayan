import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ASSETS_DIR = path.join(__dirname, '..', 'dist', 'assets');

// Ensure assets directory exists
if (!fs.existsSync(ASSETS_DIR)) {
  fs.mkdirSync(ASSETS_DIR, { recursive: true });
}

// Helper to download a file with headers
const downloadFile = (url, filename, headers = {}) => {
  return new Promise((resolve, reject) => {
    const filePath = path.join(ASSETS_DIR, filename);
    const file = fs.createWriteStream(filePath);

    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      path: urlObj.pathname + urlObj.search,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        ...headers
      }
    };

    https.get(options, (response) => {
      // Handle Redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        file.close();
        fs.unlink(filePath, () => { }); // Delete empty file
        if (response.headers.location) {
          // Resolve relative URLs
          const redirectUrl = response.headers.location.startsWith('http')
            ? response.headers.location
            : new URL(response.headers.location, url).href;
          console.log(`Redirecting to: ${redirectUrl}`);
          downloadFile(redirectUrl, filename, headers)
            .then(resolve)
            .catch(reject);
          return;
        } else {
          reject(new Error(`Redirect with no location header for '${url}'`));
          return;
        }
      }

      if (response.statusCode !== 200) {
        file.close();
        fs.unlink(filePath, () => { });
        reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${filename}`);
        resolve();
      });
    }).on('error', (err) => {
      file.close();
      fs.unlink(filePath, () => { });
      reject(err);
    });
  });
};

// 1. Javascript Libraries (Using esm.sh with ?bundle to inline dependencies)
// WE USE REACT 18.3.1 for maximum stability with manual ESM linking
const libraries = [
  {
    name: 'react.js',
    url: 'https://esm.sh/react@18.3.1?target=es2022&bundle'
  },
  {
    name: 'react-jsx-runtime.js',
    // Strictly depend on the main react package to avoid duplication
    url: 'https://esm.sh/react@18.3.1/jsx-runtime?target=es2022&bundle&deps=react@18.3.1'
  },
  {
    // Main React DOM
    name: 'react-dom.js',
    url: 'https://esm.sh/react-dom@18.3.1?target=es2022&bundle&deps=react@18.3.1'
  },
  {
    // React DOM Client (Essential for React 18+)
    // It MUST depend on react-dom main bundle to share internals
    name: 'react-dom-client.js',
    url: 'https://esm.sh/react-dom@18.3.1/client?target=es2022&bundle&deps=react@18.3.1,react-dom@18.3.1'
  },
  {
    name: 'react-router-dom.js',
    // Router v6.22.3 is very stable with React 18
    url: 'https://esm.sh/react-router-dom@6.22.3?target=es2022&bundle&deps=react@18.3.1,react-dom@18.3.1'
  },
  {
    name: 'lucide-react.js',
    url: 'https://esm.sh/lucide-react@0.344.0?target=es2022&bundle&deps=react@18.3.1'
  },
  {
    name: 'google-genai.js',
    url: 'https://esm.sh/@google/genai@1.30.0?target=es2022&bundle'
  },
  {
    name: 'jose.js',
    url: 'https://esm.sh/jose@6.1.2?target=es2022&bundle'
  },
  {
    name: 'scheduler.js',
    url: 'https://esm.sh/scheduler@0.23.0?target=es2022&bundle'
  },
  // Tailwind Standalone CLI (Play CDN version for offline use without build step)
  {
    name: 'tailwindcss.js',
    url: 'https://cdn.tailwindcss.com'
  }
];

// 2. Google Fonts Downloader with User-Agent Mocking
const downloadFonts = async () => {
  console.log('Downloading Fonts...');
  const cssUrl = 'https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800&display=swap';

  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        // Emulate Chrome to get WOFF2 format
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    };

    https.get(cssUrl, options, (res) => {
      let cssContent = '';
      res.on('data', chunk => cssContent += chunk);
      res.on('end', async () => {
        if (res.statusCode !== 200) {
          reject(new Error(`Failed to fetch CSS: ${res.statusCode}`));
          return;
        }

        // Extract WOFF2 URLs using regex (matches url(https://...))
        const urlRegex = /url\((https:\/\/[^)]+)\)/g;
        let match;
        let newCssContent = cssContent;
        let counter = 0;

        const downloads = [];

        // Reset regex state
        urlRegex.lastIndex = 0;

        while ((match = urlRegex.exec(cssContent)) !== null) {
          const originalUrl = match[1];
          const extension = originalUrl.split('.').pop() || 'woff2';
          const fontFilename = `cairo-${counter}.${extension}`;

          // Replace URL in CSS with local path
          newCssContent = newCssContent.replace(originalUrl, `./${fontFilename}`);

          // Download font file
          downloads.push(downloadFile(originalUrl, fontFilename));
          counter++;
        }

        await Promise.all(downloads);

        // Save modified CSS
        fs.writeFileSync(path.join(ASSETS_DIR, 'cairo.css'), newCssContent);
        console.log(`Fonts downloaded and CSS updated (${counter} files).`);
        resolve();
      });
    }).on('error', reject);
  });
};

const main = async () => {
  try {
    console.log('Starting asset download...');

    // Download Libraries
    await Promise.all(libraries.map(lib => downloadFile(lib.url, lib.name)));

    // Download Fonts
    await downloadFonts();

    console.log('All assets downloaded successfully to /dist/assets');
  } catch (error) {
    console.error('Error downloading assets:', error);
  }
};

main();