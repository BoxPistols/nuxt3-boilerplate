import fs from 'node:fs'
import path from 'node:path'

const RESULTS_DIR = './lighthouse-results'

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

function processReport(filePath) {
  let content = fs.readFileSync(filePath, 'utf8')
  const fileName = path.basename(filePath)

  const currentJST = getCurrentJSTTimestamp()
  const infoDiv = `
    <div id="lh-info" style="background-color: #f0f0f0; padding: 10px; text-align: center; font-family: Arial, sans-serif;">
      <strong>Report generated (JST):</strong> ${currentJST}
    </div>
  `
  // 古い lh-info div を削除
  content = content.replace(/<div id="lh-info".*?<\/div>/s, '')
  // 新しい lh-info div を挿入
  content = content.replace('<body>', `<body>${infoDiv}`)

  fs.writeFileSync(filePath, content)
  console.log(
    `Updated ${fileName} with current date/time information: ${currentJST}`
  )
}

function main() {
  const htmlFiles = fs
    .readdirSync(RESULTS_DIR)
    .filter(file => file.endsWith('.html'))

  if (htmlFiles.length === 0) {
    console.log('No HTML reports found to process.')
    return
  }

  for (const file of htmlFiles) {
    processReport(path.join(RESULTS_DIR, file))
  }
}

main()
