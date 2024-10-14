import fs from 'node:fs'
import path from 'node:path'
import { exec } from 'node:child_process'

const RESULTS_DIR = './lighthouse-results'
const cmd = process.platform === 'win32' ? 'start' : 'open'
const MAX_AGE_DAYS = 30
const now = Date.now()

// Function to get file age in days
const getFileAge = filePath => {
  const stat = fs.statSync(filePath)
  return (now - stat.mtimeMs) / (24 * 60 * 60 * 1000)
}

// Get all report files and sort by modification time (newest first)
const getAllReports = () => {
  return fs
    .readdirSync(RESULTS_DIR)
    .filter(file => file.endsWith('.html'))
    .map(file => ({
      name: file,
      path: path.join(RESULTS_DIR, file),
      age: getFileAge(path.join(RESULTS_DIR, file)),
    }))
    .sort((a, b) => a.age - b.age)
}

// Delete old files
const deleteOldReports = (reports, maxAgeDays) => {
  reports.forEach(file => {
    if (file.age > maxAgeDays) {
      fs.unlinkSync(file.path)
      console.log(`Deleted ${file.name}`)
    }
  })
}

// Open reports
const openReports = (reports, maxCount) => {
  const reportsToOpen = reports.slice(0, maxCount)

  if (reportsToOpen.length === 0) {
    console.log(
      'No recent HTML reports found in the lighthouse-results directory.'
    )
  } else {
    for (const file of reportsToOpen) {
      exec(`${cmd} "${file.path}"`, error => {
        if (error) {
          console.error(`Error opening ${file.name}:`, error)
        } else {
          console.log(`Opened ${file.name}`)
        }
      })
    }
  }
}

// Main function
const main = () => {
  const args = process.argv.slice(2)
  const maxCount = parseInt(args[0]) || 1
  const maxAgeDays = parseInt(args[1]) || MAX_AGE_DAYS

  const allReports = getAllReports()
  deleteOldReports(allReports, maxAgeDays)
  openReports(
    allReports.filter(file => file.age <= maxAgeDays),
    maxCount
  )
}

main()
