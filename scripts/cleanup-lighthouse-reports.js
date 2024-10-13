import fs from 'node:fs'
import path from 'node:path'

const RESULTS_DIR = './lighthouse-results'
const MAX_AGE_DAYS = 60

// 30日以上前のファイルを削除
const now = Date.now()
for (const file of fs.readdirSync(RESULTS_DIR)) {
  const filePath = path.join(RESULTS_DIR, file)
  const stat = fs.statSync(filePath)
  const age = now - stat.mtimeMs
  if (age > MAX_AGE_DAYS * 24 * 60 * 60 * 1000) {
    fs.unlinkSync(filePath)
    console.log(`Deleted ${filePath}`)
  }
}
