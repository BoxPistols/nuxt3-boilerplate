const os = require('node:os')
const path = require('node:path')

const isWindows = os.platform() === 'win32'
const isWSL = os.release().toLowerCase().includes('microsoft')

/** @type {import('@lhci/cli').Config} */
module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000'],
      startServerCommand: 'bun run build && bun run preview',
      maxWaitForLoad: 60000, // 60秒のタイムアウト
      numberOfRuns: 1,
      settings: {
        chromeFlags: [
          '--no-sandbox',
          '--headless=new',
          '--disable-gpu',
          '--disable-dev-shm-usage',
          '--disable-software-rasterizer',
          '--disable-extensions',
        ],
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.7 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.8 }],
        'categories:seo': ['warn', { minScore: 0.8 }],
        'first-contentful-paint': ['warn', { maxNumericValue: 3000 }],
        interactive: ['warn', { maxNumericValue: 3500 }],
      },
    },
    upload: {
      target: 'filesystem',
      outputDir: './lighthouse-results',
    },
  },
  cachePath: path.join(os.tmpdir(), '.lighthouse'),
}

if (isWindows || isWSL) {
  module.exports.ci.collect.settings.chromeFlags.push(
    '--disable-setuid-sandbox'
  )
}
