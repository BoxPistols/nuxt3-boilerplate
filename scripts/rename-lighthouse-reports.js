import fs from 'node:fs'
import path from 'node:path'

const RESULTS_DIR = './lighthouse-results'

function getCurrentJSTTimestamp() {
  const now = new Date()
  const jstDate = new Date(
    now.toLocaleString('en-US', { timeZone: 'Asia/Tokyo' })
  )
  const pad = num => num.toString().padStart(2, '0')

  const year = jstDate.getFullYear()
  const month = pad(jstDate.getMonth() + 1)
  const day = pad(jstDate.getDate())
  const hours = pad(jstDate.getHours())
  const minutes = pad(jstDate.getMinutes())
  const seconds = pad(jstDate.getSeconds())

  return `${year}_${month}_${day}_${hours}_${minutes}_${seconds}`
}

function renameFile(file) {
  const match = file.match(/lighthouse-.*-report\.(.+)$/)
  if (match) {
    const [, extension] = match
    const jstTimestamp = getCurrentJSTTimestamp()
    const newFilename = `lighthouse-${jstTimestamp}-report.${extension}`
    const oldPath = path.join(RESULTS_DIR, file)
    const newPath = path.join(RESULTS_DIR, newFilename)

    if (oldPath !== newPath) {
      fs.renameSync(oldPath, newPath)
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
    const renamedFiles = files.map(renameFile).filter(Boolean)

    // manifest.jsonの更新
    const manifestPath = path.join(RESULTS_DIR, 'manifest.json')
    if (fs.existsSync(manifestPath)) {
      const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
      let updated = false

      manifest.forEach(entry => {
        if (entry.htmlPath) {
          const oldBasename = path.basename(entry.htmlPath)
          const newBasename = renamedFiles.find(file => file.endsWith('.html'))
          if (newBasename && newBasename !== oldBasename) {
            entry.htmlPath = path.join(RESULTS_DIR, newBasename)
            updated = true
          }
        }
        if (entry.jsonPath) {
          const oldBasename = path.basename(entry.jsonPath)
          const newBasename = renamedFiles.find(file => file.endsWith('.json'))
          if (newBasename && newBasename !== oldBasename) {
            entry.jsonPath = path.join(RESULTS_DIR, newBasename)
            updated = true
          }
        }
      })

      if (updated) {
        fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2))
        console.log('Updated manifest.json with new filenames')
      } else {
        console.log('No changes needed in manifest.json')
      }
    }
  } catch (error) {
    console.error('An error occurred:', error.message)
  }
}

main()
