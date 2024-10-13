// import os from 'node:os'
// import path from 'node:path'
// import { exec } from 'node:child_process'

// const cmd = os.platform() === 'win32' ? 'start' : 'open'
// const reportPath = path.resolve('lighthouse-results')

// exec(`${cmd} ${reportPath}/*.html`, error => {
//   if (error) {
//     console.error('Error opening Lighthouse report:', error)
//   } else {
//     console.log('Lighthouse report opened successfully.')
//   }
// })

import fs from 'node:fs'
import path from 'node:path'
import { exec } from 'node:child_process'

const RESULTS_DIR = 'lighthouse-results'
const MAX_REPORTS = 1
const cmd = process.platform === 'win32' ? 'start' : 'open'

// 最新のHTMLレポートファイルを取得（最大3件）
const getLatestReports = () => {
  const htmlFiles = fs
    .readdirSync(RESULTS_DIR)
    .filter(file => file.endsWith('.html'))
    .map(file => path.join(RESULTS_DIR, file))
    .sort((a, b) => fs.statSync(b).mtime - fs.statSync(a).mtime)
    .slice(0, MAX_REPORTS)

  return htmlFiles
}

const latestReports = getLatestReports()

if (latestReports.length > 0) {
  for (const report of latestReports) {
    exec(`${cmd} "${report}"`, error => {
      if (error) {
        console.error(
          `Error opening Lighthouse report ${path.basename(report)}:`,
          error
        )
      } else {
        console.log(`Opened Lighthouse report: ${path.basename(report)}`)
      }
    })
  }
} else {
  console.log('No Lighthouse HTML reports found.')
}
