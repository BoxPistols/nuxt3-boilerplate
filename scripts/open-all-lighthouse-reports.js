import fs from 'node:fs'
import path from 'node:path'
import { exec } from 'node:child_process'

const RESULTS_DIR = './lighthouse-results'
const cmd = process.platform === 'win32' ? 'start' : 'open'

fs.readdir(RESULTS_DIR, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err)
    return
  }

  const htmlFiles = files.filter(file => file.endsWith('.html'))

  if (htmlFiles.length === 0) {
    console.log('No HTML reports found in the lighthouse-results directory.')
    return
  }

  for (const file of htmlFiles) {
    const filePath = path.join(RESULTS_DIR, file)
    exec(`${cmd} "${filePath}"`, error => {
      if (error) {
        console.error(`Error opening ${file}:`, error)
      } else {
        console.log(`Opened ${file}`)
      }
    })
  }
})
