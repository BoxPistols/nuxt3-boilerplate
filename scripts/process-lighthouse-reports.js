import fs from 'node:fs'
import path from 'node:path'

const RESULTS_DIR = './lighthouse-results'

// ファイル名からタイムスタンプを抽出し、Dateオブジェクトを返す関数
function getJSTDateFromFilename(fileName) {
  const match = fileName.match(
    /lighthouse-(\d{4})_(\d{2})_(\d{2})_(\d{2})_(\d{2})_(\d{2})-report\.(html|json)$/
  )
  if (match) {
    const [_, year, month, day, hour, minute, second] = match
    // JSTタイムゾーンを考慮したISO文字列を作成
    return new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}+09:00`)
  }
  return null
}

// JSTの日付を 'YYYY-MM-DD HH:mm:ss' 形式にフォーマットする関数
function formatJSTDate(date) {
  const options = {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }
  const formatted = new Intl.DateTimeFormat('ja-JP', options).format(date)
  return formatted.replace(/\//g, '-').replace(/:/g, ':')
}

// HTMLファイルを処理する関数
function processHtmlFile(filePath) {
  const fileName = path.basename(filePath)
  const jstDate = getJSTDateFromFilename(fileName)
  if (!jstDate) {
    console.log(`Skipped ${fileName} - invalid filename format`)
    return
  }
  const jstDateTime = formatJSTDate(jstDate)

  let content
  try {
    content = fs.readFileSync(filePath, 'utf8')
  } catch (error) {
    console.error(`Failed to read ${filePath}: ${error}`)
    return
  }

  // 既存の infoDiv を削除
  content = content.replace(/<div id="lh-info">[\s\S]*?<\/div>/, '')

  // JSONデータを抽出
  const jsonMatch = content.match(
    /window\.__LIGHTHOUSE_JSON__ = (.+?);<\/script>/
  )
  if (jsonMatch) {
    let lighthouseData
    try {
      lighthouseData = JSON.parse(jsonMatch[1])
    } catch (error) {
      console.error(`Failed to parse JSON in ${filePath}: ${error}`)
      return
    }

    // fetchTime をファイル名のタイムスタンプに設定
    lighthouseData.fetchTime = jstDate.toISOString()

    // 新しい infoDiv を作成
    const infoDiv = `
      <div id="lh-info" style="background-color: #234; color:white; padding: 10px; text-align: center; font-family: Arial, sans-serif;">
        <strong>Report generated (JST):</strong> ${jstDateTime}
      </div>
    `

    // infoDiv を <body> タグの直後に挿入
    content = content.replace('<body>', `<body>${infoDiv}`)

    // 更新された JSON データをスクリプト内に再挿入
    const updatedJson = JSON.stringify(lighthouseData)
    content = content.replace(jsonMatch[1], updatedJson)

    // 変更を保存
    try {
      fs.writeFileSync(filePath, content, 'utf8')
      console.log(`Updated ${fileName} with current JST date/time information`)
    } catch (error) {
      console.error(`Failed to write updated content to ${filePath}: ${error}`)
    }
  } else {
    console.log(`Failed to update ${fileName}: JSON data not found`)
  }
}

// JSONファイルを処理する関数
function processJsonFile(filePath) {
  const fileName = path.basename(filePath)
  const jstDate = getJSTDateFromFilename(fileName)
  if (!jstDate) {
    console.log(`Skipped ${fileName} - invalid filename format`)
    return
  }

  let content
  try {
    content = fs.readFileSync(filePath, 'utf8')
  } catch (error) {
    console.error(`Failed to read ${filePath}: ${error}`)
    return
  }

  let jsonData
  try {
    jsonData = JSON.parse(content)
  } catch (error) {
    console.error(`Failed to parse JSON for ${fileName}: ${error}`)
    return
  }

  if (jsonData.fetchTime) {
    // fetchTime をファイル名のタイムスタンプに設定
    jsonData.fetchTime = jstDate.toISOString()

    // JSONファイルを更新
    try {
      fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), 'utf8')
      console.log(
        `Updated fetchTime in ${fileName} to match filename timestamp`
      )
    } catch (error) {
      console.error(`Failed to write updated JSON to ${filePath}: ${error}`)
    }
  } else {
    console.log(`No fetchTime found in ${fileName}`)
  }
}

// メイン処理
function main() {
  const allFiles = fs.readdirSync(RESULTS_DIR)

  for (const file of allFiles) {
    const filePath = path.join(RESULTS_DIR, file)

    if (
      file.startsWith('lighthouse-') &&
      (file.endsWith('-report.html') || file.endsWith('-report.json'))
    ) {
      if (file.endsWith('.html')) {
        processHtmlFile(filePath)
      } else if (file.endsWith('.json')) {
        processJsonFile(filePath)
      }
    }
  }
}

// スクリプトの実行
main()
