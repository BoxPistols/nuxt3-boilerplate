# Nuxt Example

Deploy your [Nuxt](https://nuxt.com) project to Vercel with zero configuration.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/vercel/vercel/tree/main/examples/nuxtjs&template=nuxtjs)

_Live Example: <https://nuxtjs-template.vercel.app>_

Look at the [Nuxt 3 documentation](https://v3.nuxtjs.org) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# pnpm
pnpm

# pnpm
pnpm install --shamefully-hoist
```

## Development Server

Start the development server on <http://localhost:3000>

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Checkout the [deployment documentation](https://nuxt.com/docs/getting-started/deployment#presets) for more information.

---

## Lighthouse CI (LH CI)

### 概要

Lighthouse CIを使用してウェブパフォーマンス、アクセシビリティ、SEO、ベストプラクティスを自動評価します。

### 主要コマンド

- 実行: `pnpm lh`
- 最新レポート表示: `pnpm lh:view`
- 複数レポート表示: `pnpm lh:view:all`
- クリーンアップ: `pnpm lh:clean`
- 全削除: `pnpm lh:cleanAll`

### 設定ファイル

- `.lighthouserc.cjs`: Lighthouse CI設定
- `scripts/lighthouse-manager.js`: レポート管理スクリプト

### 自動化

- Pre-commit hook: lint、format、クリーンアップ
- GitHub Actions: PR時に自動実行

### トラブルシューティング

1. `lighthouse-results`ディレクトリ確認
2. Node.js v18.x以上確認
3. `scripts/lighthouse-manager.js`確認
4. `.lighthouserc.cjs`設定確認

問題が続く場合はイシュー作成してください。

### 貢献

変更時は必ずテストし、レビューを依頼してください。

---

## Docs

[Shells Doc](shells/shells.md)
