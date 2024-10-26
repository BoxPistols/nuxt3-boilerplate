#!/usr/bin/env node

// 必要なモジュールをインポート
import fs from 'node:fs'
import path from 'node:path'
import { exec } from 'node:child_process'
import os from 'node:os'

// WSL2環境かどうかを判定
const isWindows = os.platform() === 'win32'
const isWSL = os.release().toLowerCase().includes('microsoft')

// WSL2環境ではos.tmpdir()を上書きして'/tmp'を返す
if (isWSL) {
  os.tmpdir = () => '/tmp'
}

// 定数の定義
const RESULTS_DIR = './lighthouse-results' // Lighthouseの結果を保存するディレクトリ

// OSに応じてファイルを開くコマンドを設定
let cmd
if (isWindows) {
  cmd = 'start'
} else if (process.platform === 'darwin') {
  cmd = 'open'
} else if (process.platform === 'linux') {
  if (isWSL) {
    cmd = 'wslview' // WSL2でWindowsの既定のアプリケーションを使用
  } else {
    cmd = 'xdg-open'
  }
} else {
  cmd = 'open' // デフォルトでMacのコマンドを使用
}

// レポートの最大保持日数
const MAX_AGE_DAYS = 30

// 日本標準時（JST）の日付を取得する関数
function getJSTDate(date) {
  return new Date(date.toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' }))
}

// ファイル名用の日付フォーマット関数
function formatDateForFilename(date) {
  const year = date.getFullYear().toString().slice(2) // 年の下2桁
  const month = (date.getMonth() + 1).toString().padStart(2, '0') // 月（2桁）
  const day = date.getDate().toString().padStart(2, '0') // 日（2桁）
  const hour = date.getHours().toString().padStart(2, '0') // 時（2桁）
  const minute = date.getMinutes().toString().padStart(2, '0') // 分（2桁）
  const second = date.getSeconds().toString().padStart(2, '0') // 秒（2桁）

  return `lh_${year}-${month}${day}-${hour}${minute}-${second}`
}

// 表示用の日付フォーマット関数
function formatDateForDisplay(date) {
  return date
    .toLocaleString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'Asia/Tokyo',
    })
    .replace(/\//g, '-')
}

// 新しく生成されたファイルかどうかを判断する関数
function isNewFile(file) {
  return (
    file.startsWith('lighthouse-') ||
    file === 'report.json' ||
    file === 'manifest.json'
  )
}

// レポートのリネームと処理を行う主要な関数
function renameAndProcessReports() {
  if (!fs.existsSync(RESULTS_DIR)) {
    console.log('結果ディレクトリが存在しません。')
    return
  }

  const files = fs.readdirSync(RESULTS_DIR) // 結果ディレクトリ内のファイルを取得
  const newFiles = files.filter(isNewFile) // 新しいファイルのみをフィルタリング

  if (newFiles.length === 0) {
    console.log('新しいLighthouseレポートが見つかりませんでした。')
    return
  }

  const currentTime = new Date()
  const jstDate = getJSTDate(currentTime)
  const jstTimestamp = formatDateForFilename(jstDate)

  newFiles.forEach(file => {
    const oldPath = path.join(RESULTS_DIR, file)
    const fileExtension = path.extname(file)
    let newFilename

    // ファイルタイプに応じて新しいファイル名を決定
    if (file === 'manifest.json') {
      newFilename = `${jstTimestamp}_manifest.json`
    } else if (file === 'report.json') {
      newFilename = `${jstTimestamp}_summary.json`
    } else {
      newFilename = `${jstTimestamp}${fileExtension}`
    }

    let newPath = path.join(RESULTS_DIR, newFilename)

    // 同じ名前のファイルが既に存在する場合、ユニークな名前を生成
    let counter = 1
    while (fs.existsSync(newPath)) {
      if (file === 'manifest.json') {
        newFilename = `${jstTimestamp}_manifest_${counter}.json`
      } else if (file === 'report.json') {
        newFilename = `${jstTimestamp}_summary_${counter}.json`
      } else {
        newFilename = `${jstTimestamp}_${counter}${fileExtension}`
      }
      newPath = path.join(RESULTS_DIR, newFilename)
      counter++
    }

    // ファイルをリネーム
    fs.renameSync(oldPath, newPath)
    console.log(`Renamed ${file} to ${newFilename}`)

    // HTMLファイルの場合、生成日時情報を追加
    if (fileExtension === '.html') {
      let content = fs.readFileSync(newPath, 'utf8')
      const currentJST = formatDateForDisplay(jstDate)
      const infoDiv = `
        <div id="lh-info" style="background-color: #f0f0f0; padding: 10px; text-align: center; font-family: Arial, sans-serif;">
          <strong>Report generated (JST):</strong> ${currentJST}
        </div>
      `
      content = content.replace(/<div id="lh-info".*?<\/div>/s, '')
      content = content.replace('<body>', `<body>${infoDiv}`)
      fs.writeFileSync(newPath, content, 'utf8')
      console.log(
        `Updated ${newFilename} with current date/time information: ${currentJST}`
      )
    }

    // manifestファイルの処理
    if (file === 'manifest.json') {
      const content = JSON.parse(fs.readFileSync(newPath, 'utf8'))
      content.forEach(item => {
        // パスをファイル名のみに変更
        item.htmlPath = path.basename(item.htmlPath)
        item.jsonPath = path.basename(item.jsonPath)

        // 新しいファイル名を生成
        const newHtmlName = `${jstTimestamp}.html`
        const newJsonName = `${jstTimestamp}.json`

        // ファイル名を更新
        item.htmlPath = newHtmlName
        item.jsonPath = newJsonName
      })
      fs.writeFileSync(newPath, JSON.stringify(content, null, 2), 'utf8')
      console.log(`Updated ${newFilename} with corrected paths and times`)
    }
  })
}

// 不要なディレクトリを削除する関数
function cleanupUnwantedDirectories() {
  if (isWSL) {
    const unwantedDirs = fs
      .readdirSync('.')
      .filter(dir => dir.startsWith('C:\\Users\\'))
    unwantedDirs.forEach(dir => {
      fs.rmSync(dir, { recursive: true, force: true })
      console.log(`Deleted unwanted directory: ${dir}`)
    })
  }
}

// レポートを開く関数
function openReports(maxCount) {
  if (process.env.CI) {
    console.log('CI環境ではレポートの自動オープンをスキップします。')
    return
  }
  if (!fs.existsSync(RESULTS_DIR)) {
    console.log('結果ディレクトリが存在しません。')
    return
  }

  const htmlFiles = fs
    .readdirSync(RESULTS_DIR)
    .filter(file => file.endsWith('.html'))
    .map(file => path.join(RESULTS_DIR, file))
    .sort((a, b) => fs.statSync(b).mtime - fs.statSync(a).mtime)
    .slice(0, maxCount)

  if (htmlFiles.length === 0) {
    console.log('HTMLレポートが見つかりません。')
  } else {
    htmlFiles.forEach(file => {
      const execCommand = `${cmd} "${file}"`
      exec(execCommand, error => {
        if (error) {
          console.error(`Error opening ${path.basename(file)}:`, error)
        } else {
          console.log(`Opened ${path.basename(file)}`)
        }
      })
    })
  }
}

// 古いレポートを削除する関数
function cleanupOldReports(cleanAll = false) {
  if (!fs.existsSync(RESULTS_DIR)) {
    console.log('ディレクトリが存在しません。クリーンアップをスキップします。')
    return
  }
  const now = Date.now()
  const files = fs.readdirSync(RESULTS_DIR)
  files.forEach(file => {
    const filePath = path.join(RESULTS_DIR, file)
    const stats = fs.statSync(filePath)
    const age = (now - stats.mtime.getTime()) / (24 * 60 * 60 * 1000)
    if (cleanAll || age > MAX_AGE_DAYS) {
      fs.unlinkSync(filePath)
      console.log(`Deleted ${file}`)
    }
  })
}

// メイン関数
function main() {
  const args = process.argv.slice(2)
  const command = args[0]

  switch (command) {
    case 'rename-and-process':
      renameAndProcessReports()
      cleanupUnwantedDirectories() // 不要なディレクトリを削除
      break
    case 'open':
      openReports(parseInt(args[1]) || 1)
      break
    case 'clean':
      cleanupOldReports(args[1] === 'all')
      break
    default:
      console.log(
        'Invalid command. Use "rename-and-process", "open", or "clean".'
      )
  }
}

// スクリプトの実行
main()
