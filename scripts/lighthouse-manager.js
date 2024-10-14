import fs from 'node:fs'
import path from 'node:path'
import { exec } from 'node:child_process'

const RESULTS_DIR = './lighthouse-results'
const cmd = process.platform === 'win32' ? 'start' : 'open'
const MAX_AGE_DAYS = 30

function getJSTDate(date) {
  return new Date(date.toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' }))
}

function formatDateForFilename(date) {
  const year = date.getFullYear().toString().slice(2)
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const hour = date.getHours().toString().padStart(2, '0')
  const minute = date.getMinutes().toString().padStart(2, '0')
  const second = date.getSeconds().toString().padStart(2, '0')

  return `lh_${year}-${month}${day}-${hour}${minute}-${second}`
}

function formatDateForDisplay(date) {
  return date
    .toLocaleString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'Asia/Tokyo',
    })
    .replace(/\//g, '-')
}

function isNewFile(file) {
  return file.startsWith('lighthouse-') || file === 'report.json'
}

function renameAndProcessReports() {
  const files = fs.readdirSync(RESULTS_DIR)
  const newFiles = files.filter(isNewFile)

  if (newFiles.length === 0) {
    console.log('No new Lighthouse reports found.')
    return
  }

  const currentTime = new Date()
  const jstDate = getJSTDate(currentTime)
  const jstTimestamp = formatDateForFilename(jstDate)

  newFiles.forEach(file => {
    const oldPath = path.join(RESULTS_DIR, file)
    const fileExtension = path.extname(file)
    let newFilename

    if (file === 'report.json') {
      newFilename = `${jstTimestamp}_summary.json`
    } else {
      newFilename = `${jstTimestamp}${fileExtension}`
    }

    let newPath = path.join(RESULTS_DIR, newFilename)

    // 同じ名前のファイルが既に存在する場合、ユニークな名前を生成
    let counter = 1
    while (fs.existsSync(newPath)) {
      if (file === 'report.json') {
        newFilename = `${jstTimestamp}_summary_${counter}.json`
      } else {
        newFilename = `${jstTimestamp}_${counter}${fileExtension}`
      }
      newPath = path.join(RESULTS_DIR, newFilename)
      counter++
    }

    fs.renameSync(oldPath, newPath)
    console.log(`Renamed ${file} to ${newFilename}`)

    if (fileExtension === '.html') {
      let content = fs.readFileSync(newPath, 'utf8')
      const currentJST = formatDateForDisplay(jstDate)
      const infoDiv = `
        <div id="lh-info" style="background-color: #f0f0f0; padding: 10px; text-align: center; font-family: Arial, sans-serif;">
          <strong>Report generated (JST):</strong> ${currentJST}
        </div>
      `
      content = content.replace(/<div id="lh-info".*?<\/div>/s, '')
      content = content.replace('<body>', `<body>${infoDiv}`)
      fs.writeFileSync(newPath, content)
      console.log(
        `Updated ${newFilename} with current date/time information: ${currentJST}`
      )
    }
  })
}

// レポートを開く関数
function openReports(maxCount) {
  const htmlFiles = fs
    .readdirSync(RESULTS_DIR)
    .filter(file => file.endsWith('.html'))
    .map(file => path.join(RESULTS_DIR, file))
    .sort((a, b) => fs.statSync(b).mtime - fs.statSync(a).mtime)
    .slice(0, maxCount)

  if (htmlFiles.length === 0) {
    console.log('No HTML reports found.')
  } else {
    htmlFiles.forEach(file => {
      exec(`${cmd} "${file}"`, error => {
        if (error) {
          console.error(`Error opening ${path.basename(file)}:`, error)
        } else {
          console.log(`Opened ${path.basename(file)}`)
        }
      })
    })
  }
}

// 古いレポートを削除する関数
function cleanupOldReports(cleanAll = false) {
  const now = Date.now()
  const files = fs.readdirSync(RESULTS_DIR)
  files.forEach(file => {
    const filePath = path.join(RESULTS_DIR, file)
    const stats = fs.statSync(filePath)
    const age = (now - stats.mtime.getTime()) / (24 * 60 * 60 * 1000)
    if (cleanAll || age > MAX_AGE_DAYS) {
      fs.unlinkSync(filePath)
      console.log(`Deleted ${file}`)
    }
  })
}

// メイン関数

function main() {
  const args = process.argv.slice(2)
  const command = args[0]

  switch (command) {
    case 'rename-and-process':
      renameAndProcessReports()
      break
    case 'open':
      openReports(parseInt(args[1]) || 1)
      break
    case 'clean':
      cleanupOldReports(args[1] === 'all')
      break
    default:
      console.log(
        'Invalid command. Use "rename-and-process", "open", or "clean".'
      )
  }
}

main()
