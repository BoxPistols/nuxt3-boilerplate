import fs from 'node:fs'
import path from 'node:path'

const RESULTS_DIR = './lighthouse-results'

/**
 * JSTのタイムスタンプを取得する関数
 */
function getCurrentJSTTimestamp() {
  const now = new Date()

  // 日本標準時（JST）を取得
  // const jstOffset = 9 * 60 * 60 * 1000 // 9時間のオフセットをミリ秒で計算
  const jstDate = new Date(now.getTime())

  const pad = num => num.toString().padStart(2, '0')

  const year = jstDate.getFullYear()
  const month = pad(jstDate.getMonth() + 1)
  const day = pad(jstDate.getDate())
  const hours = pad(jstDate.getHours())
  const minutes = pad(jstDate.getMinutes())
  // const seconds = pad(jstDate.getSeconds())
  // const milliseconds = pad(jstDate.getMilliseconds(), 3) // ミリ秒を追加

  // ファイル名にミリ秒を含めることでユニークな名前にする
  return `${year}_${month}_${day}_${hours}_${minutes}`
}

function renameFile(file) {
  const filePath = path.join(RESULTS_DIR, file)

  if (file.endsWith('.html')) {
    // JSTのタイムスタンプを取得（ミリ秒を含む）
    const jstTimestamp = getCurrentJSTTimestamp()
    const newFilename = `lighthouse-${jstTimestamp}-report.html`
    const newFilePath = path.join(RESULTS_DIR, newFilename)

    if (filePath !== newFilePath) {
      fs.renameSync(filePath, newFilePath)
      console.log(`Renamed ${file} to ${newFilename}`)
      return newFilename
    }
    console.log(`File ${file} already has the correct name`)
    return file
  }
  // jsonも同様に処理
  if (file.endsWith('.json')) {
    const jstTimestamp = getCurrentJSTTimestamp()
    const newFilename = `lighthouse-${jstTimestamp}-report.json`
    const newFilePath = path.join(RESULTS_DIR, newFilename)

    if (filePath !== newFilePath) {
      fs.renameSync(filePath, newFilePath)
      console.log(`Renamed ${file} to ${newFilename}`)
      return newFilename
    }
    console.log(`File ${file} already has the correct name`)
    return file
  }

  return null
}

function main() {
  try {
    const files = fs.readdirSync(RESULTS_DIR)
    files.forEach(renameFile)
  } catch (error) {
    console.error('An error occurred:', error.message)
  }
}

main()
