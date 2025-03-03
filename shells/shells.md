# シェルスクリプト / GitHub CLI 解説

## 目次

1. [前提条件](#前提条件)
1. [マイルストーン操作](#マイルストーン操作)
1. [ラベル操作](#ラベル操作)
1. [GitHub CLI概要](#github-cli概要)
1. [注意事項](#注意事項)

## 前提条件

### 必要なツール

1. GitHub CLI (`gh`)
   - [インストールガイド](https://cli.github.com/manual/installation)
2. jq: JSONパーサー
   - [インストールガイド](https://stedolan.github.io/jq/download/)

### 初期設定手順

1. スクリプトに実行権限を付与

   ```bash
   chmod +x shells/*.sh
   ```

2. GitHub CLIの認証

   ```bash
   gh auth login
   ```

3. 認証手順の詳細
   1. GitHub.comを選択
   2. HTTPSプロトコルを選択
   3. Gitの認証を有効化
   4. ブラウザ認証を選択
   5. ワンタイムコードをブラウザで入力

## マイルストーン操作

### 基本的な一覧表示

すべてのマイルストーン

```bash
gh api "/repos/{owner}/{repo}/milestones?state=all"
```

### ソート表示

期限日でソート

```bash
gh api "/repos/{owner}/{repo}/milestones?state=all" --jq '. | sort_by(.due_on) | .[] | "\(.title)"'
```

## ラベル操作

### 既存ラベルの保存

```bash
sh ./shells/pull_labels.sh  
```

結果は./labels.jsonに保存される

### ラベルの作成/更新

```bash
sh ./shells/create_labels.sh 
```

- labels.jsonの内容に基づいてオンラインに実装
- 同一オブジェクトが無ければ、既存ラベルに積み足しされる

### 既存のラベルの確認

```bash
gh label list
```

### labels.jsonのフォーマット

example

```json
{
  "labels": [
    {
      "name": "バグ",
      "color": "d73a4a",
      "description": "バグ報告"
    },
    {
      "name": "機能改善",
      "color": "0075ca",
      "description": "新機能または機能改善の要望"
    }
  ]
}
```

## GitHub CLI概要

- GitHub CLI: <https://cli.github.com/>
- GitHub CLI API: <https://cli.github.com/manual/gh_api>

認証確認

```bash
gh auth status  # 認証状態確認
gh auth login   # 再認証
```

 APIレート制限状態確認

```bash
gh api /rate_limit  
```

[参照：GitHub API レート制限の確認](https://zenn.dev/hankei6km/scraps/4f02c89052a62c)

## 注意事項

- タイムゾーン
  - GitHub APIはUTCを使用
  - 日本時間（JST）との9時間の差を考慮する必要あり、時間一致の完全な整合性を取るにはさらにリファクタリングが必要
  - 現在時間関連はMilestone運用に対しての基本的な解決は行っている
- 一括操作
  - 大量の操作を行う場合はAPIレート制限に注意
  - 重要な操作は事前にバックアップを取得
- 権限
  - リポジトリの書き込み権限が必要
  - Organization設定によっては追加の認証が必要
