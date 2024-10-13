import fs from 'node:fs'
import path from 'node:path'

const RESULTS_DIR = './lighthouse-results'
const MANIFEST_PATH = path.join(RESULTS_DIR, 'manifest.json')

// manifestファイルを読み込む
const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'))

// パスを相対パスに変換する関数
const toRelativePath = absolutePath => {
  return path.relative(process.cwd(), absolutePath).replace(/\\/g, '/')
}

// manifestの各エントリのパスを相対パスに変換
for (const entry of manifest) {
  if (entry.htmlPath) {
    entry.htmlPath = toRelativePath(entry.htmlPath)
  }
  if (entry.jsonPath) {
    entry.jsonPath = toRelativePath(entry.jsonPath)
  }
}

// 変更されたmanifestを書き戻す
fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2))

console.log('Manifest file updated with relative paths.')
