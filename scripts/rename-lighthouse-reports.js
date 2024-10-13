import fs from 'node:fs'
import path from 'node:path'

const RESULTS_DIR = './lighthouse-results'

function convertUTCtoJST(utcString) {
  const date = new Date(
    utcString.replace(/_/g, ':').replace(/(\d{4}):(\d{2}):(\d{2})/, '$1-$2-$3T')
  )
  date.setHours(date.getHours() + 9)
  return `${date.toISOString().replace(/:/g, '_').replace('T', '_').split('.')[0]}Z`
}

function renameFile(file) {
  const match = file.match(
    /lighthouse-(\d{4}_\d{2}_\d{2}_\d{2}_\d{2}_\d{2})-report\.(.+)$/
  )
  if (match) {
    const [, utcTimestamp, extension] = match
    const jstTimestamp = convertUTCtoJST(utcTimestamp)
    const newFilename = `lighthouse-${jstTimestamp}-report.${extension}`
    fs.renameSync(
      path.join(RESULTS_DIR, file),
      path.join(RESULTS_DIR, newFilename)
    )
    console.log(`Renamed ${file} to ${newFilename}`)
    return newFilename
  }
  return null
}

const files = fs.readdirSync(RESULTS_DIR)
files.forEach(renameFile)

// manifest.jsonの更新
const manifestPath = path.join(RESULTS_DIR, 'manifest.json')
if (fs.existsSync(manifestPath)) {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
  for (const entry of manifest) {
    if (entry.htmlPath) {
      const basename = path.basename(entry.htmlPath)
      const newBasename = renameFile(basename)
      if (newBasename) {
        entry.htmlPath = entry.htmlPath.replace(basename, newBasename)
      }
    }
    if (entry.jsonPath) {
      const basename = path.basename(entry.jsonPath)
      const newBasename = renameFile(basename)
      if (newBasename) {
        entry.jsonPath = entry.jsonPath.replace(basename, newBasename)
      }
    }
  }
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2))
  console.log('Updated manifest.json with new filenames')
}
