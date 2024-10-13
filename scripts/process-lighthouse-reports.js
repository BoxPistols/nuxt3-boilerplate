import fs from 'node:fs'
import path from 'node:path'

const RESULTS_DIR = './lighthouse-results'

function processReport(filePath) {
  let content = fs.readFileSync(filePath, 'utf8')
  const fileName = path.basename(filePath)
  const match = fileName.match(
    /lighthouse-(\d{4}_\d{2}_\d{2}_\d{2}_\d{2}_\d{2})-report/
  )

  if (match) {
    const dateTime = match[1]
      .replace(/_/g, ':')
      .replace(/(\d{4}):(\d{2}):(\d{2})/, '$1-$2-$3 ')
    const infoDiv = `
      <div id="lh-info" style="background-color: #f0f0f0; padding: 10px; text-align: center; font-family: Arial, sans-serif;">
        <strong>Report generated (JST):</strong> ${dateTime}
      </div>
    `
    content = content.replace('<body>', `<body>${infoDiv}`)
    fs.writeFileSync(filePath, content)
    console.log(`Updated ${fileName} with date/time information`)
  } else {
    console.log(`Skipped ${fileName} - doesn't match expected format`)
  }
}

function main() {
  const htmlFiles = fs
    .readdirSync(RESULTS_DIR)
    .filter(file => file.endsWith('.html'))

  if (htmlFiles.length === 0) {
    console.log('No HTML reports found to process.')
    return
  }

  for (const file of htmlFiles) {
    processReport(path.join(RESULTS_DIR, file))
  }
}

main()
