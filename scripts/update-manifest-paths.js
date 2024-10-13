import fs from 'node:fs'
import path from 'node:path'

const RESULTS_DIR = './lighthouse-results'
const MANIFEST_PATH = path.join(RESULTS_DIR, 'manifest.json')

function getCurrentJSTTimestamp() {
  const now = new Date()
  const jstDate = new Date(
    now.toLocaleString('en-US', { timeZone: 'Asia/Tokyo' })
  )
  return jstDate
    .toLocaleString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
    .replace(/\//g, '-')
}

function updateManifest() {
  if (fs.existsSync(MANIFEST_PATH)) {
    const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'))
    const updatedManifest = manifest.map(entry => {
      // パスを相対パスに変更
      const htmlPath = entry.htmlPath
        ? path.relative(process.cwd(), entry.htmlPath).replace(/\\/g, '/')
        : ''
      const jsonPath = entry.jsonPath
        ? path.relative(process.cwd(), entry.jsonPath).replace(/\\/g, '/')
        : ''

      return {
        ...entry,
        htmlPath,
        jsonPath,
        timestamp: getCurrentJSTTimestamp(), // 現在のJST時間を追加
      }
    })

    fs.writeFileSync(MANIFEST_PATH, JSON.stringify(updatedManifest, null, 2))
    console.log(
      'Updated manifest.json with relative paths and current timestamp'
    )
  } else {
    console.log('manifest.json not found')
  }
}

updateManifest()
