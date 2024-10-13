import fs from 'node:fs'
import path from 'node:path'

const RESULTS_DIR = './lighthouse-results'

// UTCを日本時間（JST）に変換する関数
function convertToJST(utcString) {
  const date = new Date(utcString)
  return date.toLocaleString('ja-JP', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

// HTMLファイルを処理する関数
function processHtmlFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8')

  // JSONデータを抽出
  const jsonMatch = content.match(
    /window\.__LIGHTHOUSE_JSON__ = (.+?);<\/script>/
  )
  if (jsonMatch) {
    const lighthouseData = JSON.parse(jsonMatch[1])
    const jstDateTime = convertToJST(lighthouseData.fetchTime)

    // 新しい情報を含むdivを作成
    const infoDiv = `
      <div id="lh-info" style="background-color: #234; color:white; padding: 10px; text-align: center; font-family: Arial, sans-serif;">
        <strong>Report generated (JST):</strong> ${jstDateTime}
      </div>
    `

    // infoDiv を <body> タグの直後に挿入
    content = content.replace('<body>', `<body>${infoDiv}`)

    // 変更を保存
    fs.writeFileSync(filePath, content)
    console.log(`Updated ${path.basename(filePath)} with date/time information`)
  } else {
    console.log(
      `Failed to update ${path.basename(filePath)}: JSON data not found`
    )
  }
}

// 全HTMLファイルを処理
const htmlFiles = fs
  .readdirSync(RESULTS_DIR)
  .filter(file => file.endsWith('.html'))
for (const file of htmlFiles) {
  processHtmlFile(path.join(RESULTS_DIR, file))
}
