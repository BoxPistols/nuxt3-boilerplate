const os = require('node:os')
const path = require('node:path')

// WSL2環境かどうかを判定
const isWindows = os.platform() === 'win32'
const isWSL = os.release().toLowerCase().includes('microsoft')

// WSL2環境ではos.tmpdir()を上書きして'/tmp'を返す
if (isWSL) {
  os.tmpdir = () => '/tmp'
}

// 一時ディレクトリの設定
const tmpDir = os.tmpdir()

const BASE_URL = process.env.LIGHTHOUSE_BASE_URL || 'http://localhost:3000'

// パス名をサニタイズする関数
function sanitizePathname(pathname) {
  return pathname.replace(/[<>:"/\\|?*]/g, '_').replace(/\//g, '_') // ファイル名に使用できない文字をアンダースコアに置換
}

/** @type {import('@lhci/cli').Config} */
module.exports = {
  ci: {
    collect: {
      staticDistDir: '.output/public',
      url: ['http://localhost:3000'],
      startServerCommand: 'npx serve -p 3000 .output/public',
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
      target: 'filesystem',
      outputDir: './lighthouse-results',
      reportFilenamePattern:
        'lighthouse-%%DATETIME%%-' +
        sanitizePathname('%%PATHNAME%%') +
        '-report.%%EXTENSION%%',
    },
  },
  cachePath: path.join(tmpDir, '.lighthouse'),
}

if (isWindows || isWSL) {
  module.exports.ci.collect.settings.chromeFlags.push(
    '--disable-setuid-sandbox'
  )
}
