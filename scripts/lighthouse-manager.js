import fs from 'node:fs'
import path from 'node:path'
import { exec } from 'node:child_process'

const RESULTS_DIR = './lighthouse-results'
const MANIFEST_PATH = path.join(RESULTS_DIR, 'manifest.json')
const MAX_AGE_DAYS = 30
const MAX_COUNT = 24
const cmd = process.platform === 'win32' ? 'start' : 'open'

// ファイルの年齢を日数で取得する関数
const getFileAge = filePath => {
  const stat = fs.statSync(filePath)
  return (Date.now() - stat.mtimeMs) / (24 * 60 * 60 * 1000)
}

// URLを標準化する関数
const normalizeUrl = urlString => {
  const parsedUrl = new URL(urlString)
  return parsedUrl.pathname + parsedUrl.search + parsedUrl.hash
}

// レポートファイルの管理
const manageReports = () => {
  const allFiles = fs
    .readdirSync(RESULTS_DIR)
    .map(file => ({
      name: file,
      path: path.join(RESULTS_DIR, file),
      age: getFileAge(path.join(RESULTS_DIR, file)),
    }))
    .sort((a, b) => a.age - b.age)

  // 古いファイルと超過分を削除
  allFiles.forEach((file, index) => {
    if (file.age > MAX_AGE_DAYS || index >= MAX_COUNT) {
      fs.unlinkSync(file.path)
      console.log(`Deleted ${file.name}`)
    }
  })
}

// manifestファイルの更新
const updateManifest = () => {
  if (fs.existsSync(MANIFEST_PATH)) {
    const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'))
    for (const entry of manifest) {
      if (entry.url) {
        entry.url = normalizeUrl(entry.url)
      }
    }
    fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2))
    console.log('Manifest file updated with normalized URLs.')
  }
}

// 最新のHTMLレポートを開く
const openLatestReport = () => {
  const htmlFiles = fs
    .readdirSync(RESULTS_DIR)
    .filter(file => file.endsWith('.html'))
    .map(file => path.join(RESULTS_DIR, file))
    .sort((a, b) => fs.statSync(b).mtime - fs.statSync(a).mtime)

  if (htmlFiles.length > 0) {
    exec(`${cmd} "${htmlFiles[0]}"`, error => {
      if (error) {
        console.error('Error opening Lighthouse report:', error)
      } else {
        console.log('Latest Lighthouse report opened successfully.')
      }
    })
  } else {
    console.log('No HTML reports found in the lighthouse-results directory.')
  }
}

// 全てのHTMLレポートを開く
const openAllReports = () => {
  const htmlFiles = fs
    .readdirSync(RESULTS_DIR)
    .filter(file => file.endsWith('.html'))
    .map(file => path.join(RESULTS_DIR, file))
    .sort((a, b) => fs.statSync(b).mtime - fs.statSync(a).mtime)
    .slice(0, MAX_COUNT)

  if (htmlFiles.length > 0) {
    for (const file of htmlFiles) {
      exec(`${cmd} "${file}"`, error => {
        if (error) {
          console.error(`Error opening ${path.basename(file)}:`, error)
        } else {
          console.log(`Opened ${path.basename(file)}`)
        }
      })
    }
  } else {
    console.log('No HTML reports found in the lighthouse-results directory.')
  }
}

// メイン処理
const main = args => {
  const action = args[2]
  switch (action) {
    case 'clean':
      manageReports()
      break
    case 'update-manifest':
      updateManifest()
      break
    case 'open-latest':
      openLatestReport()
      break
    case 'open-all':
      openAllReports()
      break
    default:
      manageReports()
      updateManifest()
      openLatestReport()
  }
}

main(process.argv)
