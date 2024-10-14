import fs from 'node:fs'
import path from 'node:path'

const RESULTS_DIR = './lighthouse-results'

function getCurrentJSTTimestamp() {
  const now = new Date()

  // JSTのタイムゾーンでの表示
  return now
    .toLocaleString('ja-JP', {
      timeZone: 'Asia/Tokyo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
    .replace(/\//g, '_')
}

function renameFile(file) {
  // UTCタイムスタンプからファイルを検索
  const match = file.match(
    /lighthouse-(\d{4}_\d{2}_\d{2}T\d{2}_\d{2}_\d{2}\.\d{3}Z)-(.*)-(\d+)-report\.(.+)$/
  )
  if (match) {
    const [, , pathname, counter, extension] = match
    // 日本時間のタイムスタンプに変換
    const jstTimestamp = getCurrentJSTTimestamp()
    const newFilename = `lighthouse-${jstTimestamp}-${pathname}-${counter}-report.${extension}`
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
          const newBasename = renamedFiles.find(
            file =>
              file.endsWith('.html') && file.includes(oldBasename.split('-')[3])
          )
          if (newBasename && newBasename !== oldBasename) {
            entry.htmlPath = path.relative(
              process.cwd(),
              path.join(RESULTS_DIR, newBasename)
            ) // 相対パスに変換
            updated = true
          }
        }
        if (entry.jsonPath) {
          const oldBasename = path.basename(entry.jsonPath)
          const newBasename = renamedFiles.find(
            file =>
              file.endsWith('.json') && file.includes(oldBasename.split('-')[3])
          )
          if (newBasename && newBasename !== oldBasename) {
            entry.jsonPath = path.relative(
              process.cwd(),
              path.join(RESULTS_DIR, newBasename)
            ) // 相対パスに変換
            updated = true
          }
        }
      })

      if (updated) {
        fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2))
        console.log(
          'Updated manifest.json with new filenames and relative paths'
        )
      } else {
        console.log('No changes needed in manifest.json')
      }
    }
  } catch (error) {
    console.error('An error occurred:', error.message)
  }
}

main()
