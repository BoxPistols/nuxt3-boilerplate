import { platform, release, tmpdir } from 'node:os'
import { join } from 'node:path'

const isWindows = platform() === 'win32'
const isWSL = release().toLowerCase().includes('microsoft')

const BASE_URL = process.env.LIGHTHOUSE_BASE_URL || 'http://localhost:3000'

/** @type {import('@lhci/cli').Config} */
export const ci = {
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
      locale: 'ja', // 日本語ロケール
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
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
    target: 'filesystem', // ローカルに保存
    outputDir: './lighthouse-results', // 保存先ディレクトリ
    reportFilenamePattern: 'lighthouse-%%DATETIME%%-report.%%EXTENSION%%', // レポートファイル名パターン
  },
}
export const cachePath = join(tmpdir(), '.lighthouse')

// WindowsやWSL環境向けの追加設定
if (isWindows || isWSL) {
  ci.collect.settings.chromeFlags.push('--disable-setuid-sandbox')
}
