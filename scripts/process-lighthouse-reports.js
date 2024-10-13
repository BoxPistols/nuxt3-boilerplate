import fs from 'node:fs'
import path from 'node:path'

const RESULTS_DIR = './lighthouse-results'

// HTMLファイルを処理する関数
function processHtmlFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8')

  // ファイル名から日時とURLを抽出
  const filenameMatch = path
    .basename(filePath)
    .match(/^(\d{4}_\d{2}_\d{2}_\d{2}_\d{2}_\d{2})-(.*)-report\.html$/)
  if (filenameMatch) {
    const [, dateTime, url] = filenameMatch
    const formattedDateTime = dateTime
      .replace(/_/g, ':')
      .replace(/(\d{4}):(\d{2}):(\d{2}):/, '$1-$2-$3 ')
    const decodedUrl = decodeURIComponent(url)
      .replace(/^https?:\/\//, '')
      .replace(/\/$/, '')

    // 日時とURL情報を<head>タグ内に挿入
    const infoScript = `
      <script>
        document.addEventListener('DOMContentLoaded', () => {
          const infoDiv = document.createElement('div');
          infoDiv.style.cssText = 'background-color: #f0f0f0; padding: 10px; text-align: center; font-family: Arial, sans-serif;';
          infoDiv.innerHTML = '<strong>Report generated:</strong> ${formattedDateTime}<br><strong>URL:</strong> ${decodedUrl}';
          document.body.insertBefore(infoDiv, document.body.firstChild);
        });
      </script>
    `
    content = content.replace('</head>', `${infoScript}</head>`)

    // 変更を保存
    fs.writeFileSync(filePath, content)
    console.log(
      `Updated ${path.basename(filePath)} with date/time and URL information`
    )
  }
}

// 全HTMLファイルを処理
const htmlFiles = fs
  .readdirSync(RESULTS_DIR)
  .filter(file => file.endsWith('.html'))
for (const file of htmlFiles) {
  processHtmlFile(path.join(RESULTS_DIR, file))
}
