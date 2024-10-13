import os from 'node:os'
import path from 'node:path'
import { exec } from 'node:child_process'

const cmd = os.platform() === 'win32' ? 'start' : 'open'
const reportPath = path.resolve('lighthouse-results')

exec(`${cmd} ${reportPath}/*.html`, error => {
  if (error) {
    console.error('Error opening Lighthouse report:', error)
  } else {
    console.log('Lighthouse report opened successfully.')
  }
})
