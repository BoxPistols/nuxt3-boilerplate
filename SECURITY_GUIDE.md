# セキュリティとパフォーマンス改善ガイド

## 現在実装された改善点

### 1. 信頼性の高いCORSプロキシ

- `corsproxy.io` をデフォルトに設定
- 複数のCORSプロキシをサポート
- 自動フォールバック機能

### 2. リトライ機能

- 最大2回の自動リトライ
- 指数バックオフ（1秒、2秒間隔）
- 最終的にモックデータにフォールバック

### 3. セキュアなAPI呼び出し

- 適切なHTTPヘッダーの設定
- CORSモードの明示的な指定
- クレデンシャルの除外

## 推奨される追加セキュリティ対策

### 1. Google Places APIの制限設定

Google Cloud Consoleで以下を設定：

```text
API制限:
- HTTPリファラー制限: your-domain.com/*
- IPアドレス制限: 必要に応じて設定
- 日次クォータ制限: 適切な値に設定
```

### 2. 自己ホスト型CORSプロキシの実装

本番環境では以下のような自己ホスト型プロキシの使用を推奨：

```javascript
// サーバーサイドプロキシの例
app.get('/api/google-places', async (req, res) => {
  const { placeId, apiKey } = req.query
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}&fields=reviews,rating,user_ratings_total,name&language=ja&reviews_sort=newest`

  try {
    const response = await fetch(url)
    const data = await response.json()
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: 'API call failed' })
  }
})
```

### 3. 環境変数の最適化

Vercelで以下の環境変数を設定：

```bash
NUXT_PUBLIC_GOOGLE_PLACES_API_KEY=your-api-key
NUXT_PUBLIC_GOOGLE_PLACE_ID=your-place-id
NUXT_PUBLIC_CORS_PROXY=https://your-domain.com/api/google-places
```

### 4. モニタリングとログ

- API呼び出しの成功率を監視
- エラーログの収集
- パフォーマンスメトリクスの追跡

## トラブルシューティング

### iPhoneでAPIが失敗する場合

1. **Safariの制限**: Safariは厳格なCORSポリシーを適用
2. **HTTPS要件**: すべてのリクエストがHTTPS経由である必要
3. **User-Agent制限**: 一部のプロキシがモバイルUser-Agentをブロック

### 初回アクセスで失敗する場合

1. **DNS解決**: プロキシサービスのDNS解決に時間がかかる
2. **キャッシュ**: ブラウザキャッシュが空の状態
3. **接続タイムアウト**: ネットワーク接続の初期化に時間がかかる

## パフォーマンス最適化

### 1. キャッシュ戦略

- APIレスポンスのキャッシュ
- モックデータの事前読み込み
- ブラウザキャッシュの活用

### 2. 非同期読み込み

- コンポーネントの遅延読み込み
- プログレッシブエンハンスメント
- スケルトンローディング

### 3. エラーハンドリング

- ユーザーフレンドリーなエラーメッセージ
- 自動リトライ機能
- フォールバックコンテンツの提供
