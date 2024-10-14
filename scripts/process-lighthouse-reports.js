import fs from 'node:fs'
import path from 'node:path'

const RESULTS_DIR = './lighthouse-results'

/**
 * ファイルから JST タイムスタンプを抽出する関数
 * @param {string} filePath - HTMLファイルのフルパス
 * @returns {string|null} JSTのタイムスタンプ（ファイル名用）
 */
function extractJSTTimestampFromHtml(filePath) {
  const content = fs.readFileSync(filePath, 'utf8')

  // JSTのタイムスタンプをReport generated (JST)から抽出（スペースや改行に対応）
  const match = content.match(
    /<strong>\s*Report generated \(JST\):\s*<\/strong>\s*([\d\- :]+)/
  )
  if (match) {
    const timestamp = match[1]
    return timestamp.replace(/[-: ]/g, '_') // ファイル名形式に変換
  }
  return null
}

function renameFile(file) {
  const filePath = path.join(RESULTS_DIR, file)

  if (file.endsWith('.html')) {
    // HTMLファイルからJSTのタイムスタンプを取得
    const jstTimestamp = extractJSTTimestampFromHtml(filePath)

    if (jstTimestamp) {
      const newFilename = `lighthouse-${jstTimestamp}-report.html`
      const newFilePath = path.join(RESULTS_DIR, newFilename)

      if (filePath !== newFilePath) {
        fs.renameSync(filePath, newFilePath)
        console.log(`Renamed ${file} to ${newFilename}`)
        return newFilename
      }
      console.log(`File ${file} already has the correct name`)
      return file
    } else {
      console.log(`No valid timestamp found in ${file}`)
    }
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
              file.endsWith('.html') && file.includes(oldBasename.split('-')[1])
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
              file.endsWith('.json') && file.includes(oldBasename.split('-')[1])
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
