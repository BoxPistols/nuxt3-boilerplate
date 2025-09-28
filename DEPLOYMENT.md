# Vercelデプロイメントガイド

## 前提条件

- Vercelアカウント
- GitHubリポジトリ
- Google Places APIキー
- Google Place ID

## デプロイ手順

### 1. Vercelプロジェクトの作成

1. [Vercelダッシュボード](https://vercel.com/dashboard)にログイン
2. "New Project" をクリック
3. GitHubリポジトリを選択
4. プロジェクト名を設定

### 2. 環境変数の設定

Vercelダッシュボードで以下の環境変数を設定：

```
NUXT_PUBLIC_GOOGLE_PLACES_API_KEY=your-api-key
NUXT_PUBLIC_GOOGLE_PLACE_ID=your-place-id
NUXT_PUBLIC_CORS_PROXY=https://cors-anywhere.herokuapp.com/
```

**設定場所：**

- Settings → Environment Variables

### 3. ビルド設定の確認

プロジェクトは以下の設定で自動的にビルドされます：

- **Framework:** Nuxt.js
- **Build Command:** `yarn build`
- **Output Directory:** `dist`
- **Node.js Version:** 20.x

### 4. デプロイの実行

1. 環境変数設定後、自動的に再デプロイが実行されます
2. または手動で "Redeploy" をクリック

## トラブルシューティング

### APIキーが取得できない場合

1. 環境変数名が正確か確認（`NUXT_PUBLIC_`プレフィックス必須）
2. 環境変数の値に余分なスペースがないか確認
3. 再デプロイが実行されているか確認

### CORSエラーが発生する場合

1. `NUXT_PUBLIC_CORS_PROXY`が正しく設定されているか確認
2. 代替のCORSプロキシサービスを試す
3. 本番環境では自己ホスト型のCORSプロキシの使用を推奨

### ビルドエラーが発生する場合

1. Node.jsバージョンが20.x以上か確認
2. `yarn.lock`ファイルがコミットされているか確認
3. 依存関係が正しくインストールされているか確認

## 本番環境での推奨設定

- 自己ホスト型のCORSプロキシを使用
- APIキーの制限設定（HTTPリファラー制限など）
- 定期的なAPIキーのローテーション
- モニタリングとログの設定

## パフォーマンス最適化

- 静的サイト生成（SSG）モードで動作
- 画像の最適化
- CDN配信による高速化
- キャッシュの活用
