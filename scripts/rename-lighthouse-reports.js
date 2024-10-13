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
 * @returns {string|null} - リネーム後のファイルパス、またはエラー時はnull
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
        console.log(`Renamed and ready to process: ${newFilePath}`)
      }
    }
  }
}

// スクリプトの実行
main()
