const os = require('node:os')
const path = require('node:path')

const isWindows = os.platform() === 'win32'
const isWSL = os.release().toLowerCase().includes('microsoft')

const BASE_URL = process.env.LIGHTHOUSE_BASE_URL || 'http://localhost:3000'

/** @type {import('@lhci/cli').Config} */
module.exports = {
  ci: {
    collect: {
      staticDistDir: '.output/public',
      // CIではstartServerCommandでローカルサーバを立ち上げ、URLはlocalhostを使う
      url: ['http://localhost:3000'],
      startServerCommand: 'npx serve -p 3000 .output/public',
      // serveの標準出力に合わせて準備完了パターンを調整
      startServerReadyPattern: 'accepting connections',
      maxWaitForLoad: 90000,
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
