const os = require('node:os')
const path = require('node:path')

// Platform detection
const isWSL = os.release().toLowerCase().includes('microsoft')
const isWindows = os.platform() === 'win32'

// Override tmpdir for WSL2
if (isWSL) {
  os.tmpdir = () => '/tmp'
}

const sanitizePathname = pathname =>
  pathname.replace(/[<>:"/\\|?*]/g, '_').replace(/\//g, '_')

/** @type {import('@lhci/cli').Config} */
module.exports = {
  ci: {
    collect: {
      staticDistDir: '.output/public',
      url: ['http://localhost:3000'],
      startServerCommand: 'pnpm dlx serve -p 3000 .output/public',
      startServerReadyPattern: 'Listening on',
      maxWaitForLoad: 60000,
      numberOfRuns: 1,
      settings: {
        chromeFlags: [
          '--no-sandbox',
          '--headless=new',
          '--disable-gpu',
          '--disable-dev-shm-usage',
          '--disable-software-rasterizer',
          '--disable-extensions',
          ...(isWindows || isWSL ? ['--disable-setuid-sandbox'] : []),
        ],
        locale: 'ja',
        onlyCategories: [
          'performance',
          'accessibility',
          'best-practices',
          'seo',
        ],
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.7 }],
        'categories:accessibility': ['error', { minScore: 0.8 }],
        'categories:best-practices': ['warn', { minScore: 0.8 }],
        'categories:seo': ['warn', { minScore: 0.9 }],
        'first-contentful-paint': ['warn', { maxNumericValue: 3000 }],
        interactive: ['warn', { maxNumericValue: 3500 }],
      },
    },
    upload: {
      target: 'filesystem',
      outputDir: './lighthouse-results',
      reportFilenamePattern: `lighthouse-%%DATETIME%%-${sanitizePathname(
        '%%PATHNAME%%'
      )}-report.%%EXTENSION%%`,
    },
  },
  cachePath: path.join(os.tmpdir(), '.lighthouse'),
}
