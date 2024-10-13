import fs from 'node:fs'
import path from 'node:path'

const RESULTS_DIR = './lighthouse-results'
const MANIFEST_PATH = path.join(RESULTS_DIR, 'manifest.json')

// manifestファイルを読み込む
const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'))

// URLを標準化する関数
const normalizeUrl = urlString => {
  const parsedUrl = new URL(urlString)
  return parsedUrl.pathname + parsedUrl.search + parsedUrl.hash
}

// manifestの各エントリのURLを標準化
for (const entry of manifest) {
  if (entry.url) {
    entry.url = normalizeUrl(entry.url)
  }
}

// 変更されたmanifestを書き戻す
fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2))

console.log('Manifest file updated with normalized URLs.')
