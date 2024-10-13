import fs from 'node:fs'
import path from 'node:path'

const RESULTS_DIR = './lighthouse-results'
const MAX_AGE_DAYS = 60

function cleanupOldReports() {
  const now = new Date()
  fs.readdir(RESULTS_DIR, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err)
      return
    }

    // biome-ignore lint/complexity/noForEach: <explanation>
    files.forEach(file => {
      const filePath = path.join(RESULTS_DIR, file)
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error('Error getting file stats:', err)
          return
        }

        const ageInDays = (now - stats.mtime) / (1000 * 60 * 60 * 24)
        if (ageInDays > MAX_AGE_DAYS) {
          fs.unlink(filePath, err => {
            if (err) {
              console.error('Error deleting file:', err)
            } else {
              console.log(`Deleted old report: ${file}`)
            }
          })
        }
      })
    })
  })
}

cleanupOldReports()
