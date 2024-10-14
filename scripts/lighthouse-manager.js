// lighthouse-manager.js
import fs from 'node:fs'
import path from 'node:path'
import { exec } from 'node:child_process'

const RESULTS_DIR = './lighthouse-results'
const cmd = process.platform === 'win32' ? 'start' : 'open'
const MAX_AGE_DAYS = 30

function getCurrentJSTTimestamp(forFilename = false) {
  const now = new Date()
  const jstDate = new Date(
    now.toLocaleString('en-US', { timeZone: 'Asia/Tokyo' })
  )

  if (forFilename) {
    const pad = num => num.toString().padStart(2, '0')
    return `${jstDate.getFullYear()}_${pad(jstDate.getMonth() + 1)}_${pad(jstDate.getDate())}_${pad(jstDate.getHours())}_${pad(jstDate.getMinutes())}_${pad(jstDate.getSeconds())}_${pad(jstDate.getMilliseconds(), 3)}`
  } else {
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
}

function renameAndProcessReports() {
  const files = fs.readdirSync(RESULTS_DIR)
  files.forEach(file => {
    if (file.endsWith('.html')) {
      const oldPath = path.join(RESULTS_DIR, file)
      const jstTimestamp = getCurrentJSTTimestamp(true)
      const newFilename = `lighthouse-${jstTimestamp}-report.html`
      const newPath = path.join(RESULTS_DIR, newFilename)

      fs.renameSync(oldPath, newPath)
      console.log(`Renamed ${file} to ${newFilename}`)

      let content = fs.readFileSync(newPath, 'utf8')
      const currentJST = getCurrentJSTTimestamp()
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
