const os = require('node:os')
const path = require('node:path')

const isWindows = os.platform() === 'win32'
const isWSL = os.release().toLowerCase().includes('microsoft')

// const BASE_URL = process.env.LIGHTHOUSE_BASE_URL || 'http://localhost:3000'
const BASE_URL = 'http://localhost:3000'

/** @type {import('@lhci/cli').Config} */
module.exports = {
  ci: {
    collect: {
      url: [`${BASE_URL}/`],
      startServerCommand: 'node .output/server/index.mjs',
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
        ],
        locale: 'ja', // 日本語設定
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
      // target: 'temporary-public-storage', // 一時的なストレージにアップロード
      target: 'filesystem',
      outputDir: './lighthouse-results',
      reportFilenamePattern:
        'lighthouse-%%DATETIME%%-%%PATHNAME%%-report.%%EXTENSION%%',
    },
  },
  cachePath: path.join(os.tmpdir(), '.lighthouse'),
}

if (isWindows || isWSL) {
  module.exports.ci.collect.settings.chromeFlags.push(
    '--disable-setuid-sandbox'
  )
}
