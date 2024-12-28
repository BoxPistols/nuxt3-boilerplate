// platform-check.js
import { execSync } from 'node:child_process'
import { platform } from 'node:os'

// MacOSかどうかをチェック
const isMac = platform() === 'darwin'

try {
  // ビルドを実行
  execSync('pnpm build', {
    stdio: 'inherit',
    encoding: 'utf-8',
  })

  // MacOS以外では終了
  if (!isMac) {
    console.log('\n=== Build completed ===')
    console.log('Lighthouse CIはMac OS環境でのみ実行されます。')
    console.log('ビルドを完了して終了します。')
    console.log('========================\n')
    process.exit(0)
  }

  // MacOSの場合は続けて実行
  execSync(
    'lhci autorun && node scripts/lighthouse-manager.js rename-and-process && node scripts/lighthouse-manager.js open',
    {
      stdio: 'inherit',
      encoding: 'utf-8',
    }
  )
} catch (error) {
  console.error('エラーが発生しました:', error)
  process.exit(1)
}
