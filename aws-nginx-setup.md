# AWS + NGINX環境での最適化設定

## 1. NGINX設定（nginx.conf）

```nginx
server {
    listen 80;
    listen 443 ssl http2;
    server_name your-domain.com;

    # SSL設定
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/private.key;

    # セキュリティヘッダー
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # メインアプリケーション
    location / {
        root /var/www/html;
        try_files $uri $uri/ /index.html;

        # キャッシュ設定
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }

    # Google Places API プロキシ
    location /api/google-places {
        # レート制限
        limit_req zone=api burst=10 nodelay;

        # プロキシ設定
        proxy_pass https://maps.googleapis.com/maps/api/place/details/json;
        proxy_set_header Host maps.googleapis.com;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # タイムアウト設定
        proxy_connect_timeout 5s;
        proxy_send_timeout 10s;
        proxy_read_timeout 10s;

        # キャッシュ設定
        proxy_cache api_cache;
        proxy_cache_valid 200 1h;
        proxy_cache_key "$scheme$request_method$host$request_uri";
    }

    # レート制限ゾーン
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/m;

    # キャッシュゾーン
    proxy_cache_path /var/cache/nginx/api levels=1:2 keys_zone=api_cache:10m max_size=1g inactive=1h;
}
```

## 2. Node.js サーバーサイドプロキシ（オプション）

```javascript
// server/api/google-places.js
export default defineEventHandler(async event => {
  const query = getQuery(event)
  const { placeId, apiKey } = query

  if (!placeId || !apiKey) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required parameters',
    })
  }

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}&fields=reviews,rating,user_ratings_total,name&language=ja&reviews_sort=newest`

  try {
    const response = await fetch(url)
    const data = await response.json()

    // キャッシュヘッダーを設定
    setHeader(event, 'Cache-Control', 'public, max-age=3600')

    return data
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch Google Places data',
    })
  }
})
```

## 3. フロントエンドの修正

```javascript
// src/components/GoogleReviews.vue
const fetchReviews = async (retryCount = 0) => {
  // ... 既存のコード ...

  try {
    const targetUrl = `/api/google-places?place_id=${props.placeId}&key=${props.apiKey}`

    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      credentials: 'same-origin',
    })

    // ... 既存のコード ...
  } catch (err) {
    // ... 既存のエラーハンドリング ...
  }
}
```

## 4. AWS CloudFront設定

```yaml
# cloudfront.yml
Distribution:
  Origins:
    - Id: S3Origin
      DomainName: your-bucket.s3.amazonaws.com
      S3OriginConfig:
        OriginAccessIdentity: origin-access-identity/cloudfront/XXXXXXXXX
    - Id: APIGatewayOrigin
      DomainName: your-api-gateway.execute-api.region.amazonaws.com
      CustomOriginConfig:
        HTTPPort: 443
        HTTPSPort: 443
        OriginProtocolPolicy: https-only

  DefaultCacheBehavior:
    TargetOriginId: S3Origin
    ViewerProtocolPolicy: redirect-to-https
    CachePolicyId: 4135ea2d-6df8-44a3-9df3-4b5a84be39ad # Managed-CachingOptimized

  CacheBehaviors:
    - PathPattern: /api/*
      TargetOriginId: APIGatewayOrigin
      ViewerProtocolPolicy: https-only
      CachePolicyId: 4135ea2d-6df8-44a3-9df3-4b5a84be39ad
      TTL:
        DefaultTTL: 3600
        MaxTTL: 86400
```

## 5. セキュリティ強化

### WAF設定

```yaml
# AWS WAF Rules
Rules:
  - Name: RateLimitRule
    Priority: 1
    Statement:
      RateBasedStatement:
        Limit: 2000
        AggregateKeyType: IP
    Action:
      Block: {}

  - Name: GeoBlockRule
    Priority: 2
    Statement:
      GeoMatchStatement:
        CountryCodes: ['US', 'JP', 'CA', 'GB']
    Action:
      Allow: {}
```

### API Gateway設定

```yaml
# API Gateway設定
ApiGateway:
  Type: AWS::ApiGateway::RestApi
  Properties:
    Name: GooglePlacesProxy
    Description: Proxy for Google Places API
    EndpointConfiguration:
      Types: [REGIONAL]

  Resources:
    - PathPart: google-places
      Methods:
        - HttpMethod: GET
          AuthorizationType: NONE
          Integration:
            Type: HTTP_PROXY
            IntegrationHttpMethod: GET
            Uri: https://maps.googleapis.com/maps/api/place/details/json
```

## 6. モニタリングとログ

### CloudWatch設定

```yaml
# CloudWatch Logs
LogGroups:
  - LogGroupName: /aws/nginx/access
    RetentionInDays: 30
  - LogGroupName: /aws/nginx/error
    RetentionInDays: 30
  - LogGroupName: /aws/api-gateway/google-places
    RetentionInDays: 30
```

### アラート設定

```yaml
# CloudWatch Alarms
Alarms:
  - AlarmName: HighErrorRate
    MetricName: 4XXError
    Namespace: AWS/ApiGateway
    Statistic: Sum
    Period: 300
    EvaluationPeriods: 2
    Threshold: 10
    ComparisonOperator: GreaterThanThreshold
```

## 7. パフォーマンス最適化

### CDN設定

- CloudFrontで静的コンテンツを配信
- APIレスポンスのキャッシュ
- 画像の最適化とWebP変換

### データベースキャッシュ

- Redis/ElastiCacheでAPIレスポンスをキャッシュ
- セッション管理
- レート制限の実装

## 8. 移行時の考慮事項

### VercelからAWSへの移行

1. **環境変数の移行**: AWS Systems Manager Parameter Store
2. **ドメイン設定**: Route 53でのDNS設定
3. **SSL証明書**: AWS Certificate Manager
4. **CI/CD**: GitHub Actions + AWS CodeDeploy

### 段階的移行

1. **Phase 1**: 静的サイトをS3 + CloudFrontに移行
2. **Phase 2**: APIプロキシをAPI Gatewayに移行
3. **Phase 3**: フルスタックアプリケーションに移行
