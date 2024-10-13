import fs from 'node:fs'
import path from 'node:path'

const RESULTS_DIR = './lighthouse-results'

/**
 * 現在の日本標準時（JST）を 'YYYY_MM_DD_HH_mm_SS' の形式で取得する関数
 * @returns {string} - 現在のJST時刻をフォーマットした文字列
 */
function getCurrentJSTTimestamp() {
  const now = new Date()
  const jstOptions = {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }
  const formatter = new Intl.DateTimeFormat('ja-JP', jstOptions)
  const parts = formatter.formatToParts(now)
  const dateParts = {}
  parts.forEach(({ type, value }) => {
    if (type !== 'literal') {
      dateParts[type] = value
    }
  })
  return `${dateParts.year}_${dateParts.month}_${dateParts.day}_${dateParts.hour}_${dateParts.minute}_${dateParts.second}`
}

/**
 * 現在のJST時刻を取得し、指定されたファイルのタイムスタンプ部分をオーバーライドしてリネームする関数
 * @param {string} filePath - 元のファイルのフルパス
 * @returns {string|null} - リネーム後のファイル名、またはエラー時はnull
 */
function renameFileToCurrentJST(filePath) {
  const fileName = path.basename(filePath)
  const match = fileName.match(
    /lighthouse-\d{4}_\d{2}_\d{2}_\d{2}_\d{2}_\d{2}-report\.(html|json)$/
  )
  if (match) {
    const extension = match[1]
    const currentJST = getCurrentJSTTimestamp()
    const newFilename = `lighthouse-${currentJST}-report.${extension}`
    const newFilePath = path.join(path.dirname(filePath), newFilename)

    // ファイル名の競合を避けるため、同名ファイルが存在しないことを確認
    if (fs.existsSync(newFilePath)) {
      console.error(
        `Cannot rename ${fileName} to ${newFilename}: Target file already exists.`
      )
      return null
    }

    // ファイルのリネーム
    try {
      fs.renameSync(filePath, newFilePath)
      console.log(`Renamed ${fileName} to ${newFilename}`)
      return newFilePath
    } catch (error) {
      console.error(`Failed to rename ${fileName}: ${error}`)
      return null
    }
  } else {
    console.log(`Skipped ${fileName} - doesn't match expected format`)
    return null
  }
}

/**
 * HTMLファイルを処理し、fetchTimeを現在のJST時刻に更新し、情報を含むdivを挿入する関数
 * @param {string} filePath - 処理対象のHTMLファイルのフルパス
 */
function processHtmlFile(filePath) {
  let content
  try {
    content = fs.readFileSync(filePath, 'utf8')
  } catch (error) {
    console.error(`Failed to read ${filePath}: ${error}`)
    return
  }

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

    // 現在のJST時刻をISO形式で取得
    const now = new Date()
    const jstDateTime = now
      .toLocaleString('ja-JP', {
        timeZone: 'Asia/Tokyo',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      })
      .replace(/\//g, '-')
      .replace(/:/g, ':')

    // fetchTimeを現在のJST時刻のISO形式に更新
    lighthouseData.fetchTime = now.toISOString()

    // 新しい情報を含むdivを作成
    const infoDiv = `
      <div id="lh-info" style="background-color: #234; color:white; padding: 10px; text-align: center; font-family: Arial, sans-serif;">
        <strong>Report generated (JST):</strong> ${jstDateTime}
      </div>
    `

    // infoDiv を <body> タグの直後に挿入
    content = content.replace('<body>', `<body>${infoDiv}`)

    // 更新されたJSONデータをスクリプト内に再挿入
    const updatedJson = JSON.stringify(lighthouseData)
    content = content.replace(jsonMatch[1], updatedJson)

    // 変更を保存
    try {
      fs.writeFileSync(filePath, content, 'utf8')
      console.log(
        `Updated ${path.basename(filePath)} with current JST date/time information`
      )
    } catch (error) {
      console.error(`Failed to write updated content to ${filePath}: ${error}`)
    }
  } else {
    console.log(
      `Failed to update ${path.basename(filePath)}: JSON data not found`
    )
  }
}

/**
 * JSONファイルを処理し、fetchTimeを現在のJST時刻に更新する関数
 * @param {string} filePath - 処理対象のJSONファイルのフルパス
 */
function processJsonFile(filePath) {
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
    console.error(
      `Failed to parse JSON for ${path.basename(filePath)}: ${error}`
    )
    return
  }

  if (jsonData.fetchTime) {
    // 現在のJST時刻をISO形式で取得
    const now = new Date()
    jsonData.fetchTime = now.toISOString()

    // JSONファイルを更新
    try {
      fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), 'utf8')
      console.log(
        `Updated fetchTime in ${path.basename(filePath)} to current JST time`
      )
    } catch (error) {
      console.error(`Failed to write updated JSON to ${filePath}: ${error}`)
    }
  } else {
    console.log(`No fetchTime found in ${path.basename(filePath)}`)
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
      // ファイル名を現在のJST時刻でリネーム
      const newFilePath = renameFileToCurrentJST(filePath)

      if (newFilePath) {
        // ファイルタイプに応じて処理を実行
        if (newFilePath.endsWith('.html')) {
          processHtmlFile(newFilePath)
        } else if (newFilePath.endsWith('.json')) {
          processJsonFile(newFilePath)
        }
      }
    }
  }
}

// スクリプトの実行
main()
