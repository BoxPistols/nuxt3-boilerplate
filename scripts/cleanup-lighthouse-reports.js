import fs from 'node:fs'
import path from 'node:path'

const RESULTS_DIR = './lighthouse-results'
const MAX_AGE_DAYS = 60

// MAX_AGE_DAYS日以上前のファイルを削除
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

// すべてのファイルを削除
const removeAllReports = () => {
  for (const file of fs.readdirSync(RESULTS_DIR)) {
    const filePath = path.join(RESULTS_DIR, file)
    fs.unlinkSync(filePath)
    console.log(`Deleted ${filePath}`)
  }
}

// メイン処理
const main = args => {
  const action = args[2]
  switch (action) {
    case 'cleanAll':
      removeAllReports()
      break
    default:
      console.error(`Unknown action: ${action}`)
      break
  }
}

main(process.argv)
