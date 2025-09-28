# Nuxt Example

Deploy your [Nuxt](https://nuxt.com) project to Vercel with zero configuration.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/vercel/vercel/tree/main/examples/nuxtjs&template=nuxtjs)

_Live Example: <https://nuxtjs-template.vercel.app>_

Look at the [Nuxt 3 documentation](https://v3.nuxtjs.org) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn

# npm
npm install

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

- 実行: `yarn lh`
- 最新レポート表示: `yarn lh:view`
- 複数レポート表示: `yarn lh:view:all`
- クリーンアップ: `yarn lh:clean`
- 全削除: `yarn lh:cleanAll`

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

## 📚 学習ドキュメント

このプロジェクトで使用されている技術の学習リソース：

- **[STUDY.md](./STUDY.md)** - 学習ドキュメント一覧
- **[SECURITY_GUIDE.md](./SECURITY_GUIDE.md)** - セキュリティガイド
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - デプロイメントガイド
- **[aws-nginx-setup.md](./aws-nginx-setup.md)** - AWS + NGINX設定

### 技術スタック学習

- **Nuxt 3** - Vue.jsフレームワーク
- **TypeScript** - 型安全なJavaScript
- **Tailwind CSS** - ユーティリティファーストCSS
- **Vercel** - 静的サイトホスティング
- **AWS** - クラウドインフラ
- **NGINX** - Webサーバー・リバースプロキシ
