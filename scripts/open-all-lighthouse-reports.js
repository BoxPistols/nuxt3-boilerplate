/**
 * This script manages Lighthouse reports by opening recent HTML reports,
 * deleting old reports, and limiting the total number of reports.
 */
import fs from 'node:fs'
import path from 'node:path'
import { exec } from 'node:child_process'

const RESULTS_DIR = './lighthouse-results'
const cmd = process.platform === 'win32' ? 'start' : 'open'
const MAX_COUNT = 12
const MAX_AGE_DAYS = 60
const now = Date.now()

// Function to get file age in days
const getFileAge = filePath => {
  const stat = fs.statSync(filePath)
  return (now - stat.mtimeMs) / (24 * 60 * 60 * 1000)
}

// Get all report files and sort by modification time (newest first)
const allFiles = fs
  .readdirSync(RESULTS_DIR)
  .map(file => ({
    name: file,
    path: path.join(RESULTS_DIR, file),
    age: getFileAge(path.join(RESULTS_DIR, file)),
  }))
  .sort((a, b) => a.age - b.age)

// Delete old files and keep only MAX_COUNT newest files
allFiles.forEach((file, index) => {
  if (file.age > MAX_AGE_DAYS || index >= MAX_COUNT) {
    fs.unlinkSync(file.path)
    console.log(`Deleted ${file.name}`)
  }
})

// Open HTML reports
const htmlFiles = allFiles
  .filter(file => file.name.endsWith('.html') && file.age <= MAX_AGE_DAYS)
  .slice(0, MAX_COUNT)

if (htmlFiles.length === 0) {
  console.log(
    'No recent HTML reports found in the lighthouse-results directory.'
  )
} else {
  for (const file of htmlFiles) {
    exec(`${cmd} "${file.path}"`, error => {
      if (error) {
        console.error(`Error opening ${file.name}:`, error)
      } else {
        console.log(`Opened ${file.name}`)
      }
    })
  }
}
