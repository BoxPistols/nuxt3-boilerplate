# GitHub プロジェクト管理ツール - 総合ガイド

このドキュメントは、GitHubプロジェクト管理のための2つの強力なツール「GitHub マイルストーン管理ツール」と「GitHub ラベル管理ツール」の使用方法を説明します。両ツールともMacOSとLinux（WSL含む）で動作するクロスプラットフォーム対応です。

<!-- ![GitHub管理ツール](/images/github-tools-header.png) -->

## 目次

- [概要](#概要)
- [インストールと依存関係](#インストールと依存関係)
- [GitHub マイルストーン管理ツール](#github-マイルストーン管理ツール)
- [GitHub ラベル管理ツール](#github-ラベル管理ツール)
- [チーム開発での活用方法](#チーム開発での活用方法)
- [トラブルシューティング](#トラブルシューティング)
- [FAQ](#faq)

## 概要

### GitHub マイルストーン管理ツール

プロジェクトのスケジュール管理に欠かせないマイルストーンを効率的に作成・管理するためのコマンドラインツーです。スプリントベースの開発や計画的なリリースサイクルを簡単に設定できます。

**主な機能:**

- 指定期間の特定曜日にマイルストーンを一括生成
- マイルストーン一覧の表示（連番付き）
- マイルストーンの選択削除・一括削除

### GitHub ラベル管理ツール

Issue管理を効率化するラベルを簡単に作成・管理するためのコマンドラインツールです。チーム間で統一されたラベル設定を維持し、課題管理を標準化できます。

**主な機能:**

- ラベル一覧の色付き表示
- ラベル情報のJSON形式での保存・復元
- ラベルの一括作成・更新・削除
- バックアップと復元機能

## インストールと依存関係

### 前提条件

両ツールには以下の依存関係があります：

- **GitHub CLI (`gh`)**: GitHubとの通信に使用
- **jq**: JSON処理に使用
- **Git**: リポジトリ情報の取得に使用
- **Bash 4.0以上**: スクリプト実行環境

### 依存ツールのインストール

#### GitHub CLI

```bash
# MacOS
brew install gh

# Ubuntu
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
sudo apt update
sudo apt install gh
```

#### jq

```bash
# MacOS
brew install jq

# Ubuntu
sudo apt install jq
```

### GitHub CLIの認証設定

```bash
gh auth login
```

画面の指示に従ってGitHubアカウントの認証を完了させてください。

### スクリプトのインストール

```bash
# リポジトリのクローン（または単一ファイルのダウンロード）
git clone https://github.com/your-username/github-tools.git
cd github-tools

# 実行権限の付与
chmod +x github_milestone.sh
chmod +x github_labels.sh

# shellsディレクトリに配置する場合
mkdir -p shells
cp github_milestone.sh github_labels.sh shells/
chmod +x shells/*.sh
```

## GitHubマイルストーン管理ツール

### 基本的な使い方

```bash
./shells/github_milestone.sh
```

スクリプトを実行すると、以下のメニューが表示されます：

```bash
操作を選択してください:
1) マイルストーン生成
2) マイルストーン一覧表示
3) マイルストーン選択削除
4) 全マイルストーン削除
q) 終了
```

### 1. マイルストーン生成

このオプションを選択すると、以下の情報を順に入力するよう求められます：

```bash
開始日 (YYYY-MM-DD):
2025-01-01
終了日 (YYYY-MM-DD):
2025-03-31
スプリントの終了曜日を選択してください (月=1, 火=2, 水=3, 木=4, 金=5, 土=6, 日=7):
5
スプリントサイクルを週単位で入力してください (例: 1 または 2):
2
開始日が指定曜日と同じ場合、その日を含めますか？ (y/n, デフォルトはy):
y
マイルストーンの時間を入力してください (HH:MM 形式, デフォルトは17:00):
17:00
```

入力が完了すると、指定した期間内の指定曜日（この例では金曜日）ごとにマイルストーンが自動生成されます。

**入力項目の説明：**

| 項目                 | 説明                                                         |
| -------------------- | ------------------------------------------------------------ |
| 開始日               | マイルストーン生成の開始日（例：2025-01-01）                 |
| 終了日               | マイルストーン生成の終了日（例：2025-03-31）                 |
| スプリント終了曜日   | 曜日を数字で指定（月=1, 火=2, 水=3, 木=4, 金=5, 土=6, 日=7） |
| スプリントサイクル   | 1週間、2週間などスプリントの期間（週単位）                   |
| 開始日を含めるか     | 開始日が指定曜日と同じ場合、その日をマイルストーンに含めるか |
| マイルストーンの時間 | マイルストーンの終了時刻（HH:MM形式）                        |

生成される各マイルストーンには以下の情報が含まれます：

- **タイトル**: YY-MM-DD W週番号（例：25-01-03 W01）
- **説明**: 期間: YYYY-MM-DD から YYYY-MM-DD (X曜日)
- **期限**: 指定した日付と時間

### 2. マイルストーン一覧表示

現在のリポジトリに設定されているマイルストーンの一覧を表示します：

```bash
マイルストーン一覧:
番号  | リリース日 週番号
----------------------------------------
001   | 25-01-03 W01 (2025-01-03)
002   | 25-01-17 W03 (2025-01-17)
003   | 25-01-31 W05 (2025-01-31)
...
```

連番、タイトル、日付の形式で表示されます。

### 3. マイルストーン選択削除

特定のマイルストーンを選択して削除します：

```bash
削除するマイルストーンを選択してください（複数選択可、スペース区切り）:
161: 25-01-03 W01
162: 25-01-17 W03
163: 25-01-31 W05
...
```

削除したいマイルストーンの番号をスペース区切りで入力すると、選択したマイルストーンが削除されます。

### 4. 全マイルストーン削除

リポジトリ内のすべてのマイルストーンを削除します。確認プロンプトが表示されるので、`y`で確定します。

## GitHubラベル管理ツール

### 基本的な 使い方

```bash
./shells/github_labels.sh
```

引数なしでスクリプトを実行すると、対話型メニューが表示されます：

```bash
GitHub ラベル管理ツール v1.0.0
リポジトリ: your-username/your-repo

操作を選択してください:
1) ラベル一覧表示
2) ラベル情報取得（JSON保存）
3) ラベル作成/更新
4) ラベル削除
5) ラベルバックアップ
6) ラベル復元
q) 終了

選択:
```

### コマンドライン実行

特定の機能を直接実行することもできます：

```bash
# ラベル一覧表示
./shells/github_labels.sh list

# ラベル情報をJSONに保存
./shells/github_labels.sh pull

# カスタムファイル名で保存
./shells/github_labels.sh pull my_labels.json

# JSONからラベルを作成
./shells/github_labels.sh create

# カスタムJSONファイルからラベルを作成
./shells/github_labels.sh create my_labels.json

# ラベルをバックアップ
./shells/github_labels.sh backup

# バックアップから復元
./shells/github_labels.sh restore

# ヘルプを表示
./shells/github_labels.sh help
```

### 1. ラベル一覧表示

現在のリポジトリに設定されているラベルを色付きで一覧表示します：

```bash
名前                           カラー     説明
================================================================================
bug                            #d73a4a   Something isn't working
documentation                  #0075ca   Improvements or additions to documentation
duplicate                      #cfd3d7   This issue or pull request already exists
enhancement                    #a2eeef   New feature or request
good first issue               #7057ff   Good for newcomers
help wanted                    #008672   Extra attention is needed
invalid                        #e4e669   This doesn't seem right
question                       #d876e3   Further information is requested
wontfix                        #ffffff   This will not be worked on
```

### 2. ラベル情報取得（JSON保存）

リポジトリの現在のラベル設定をJSONファイルに保存します：

```json
[
  {
    "name": "bug",
    "color": "d73a4a",
    "description": "Something isn't working"
  },
  {
    "name": "documentation",
    "color": "0075ca",
    "description": "Improvements or additions to documentation"
  },
  ...
]
```

### 3. ラベル作成/更新

JSONファイルからラベルを一括作成または更新します。既存のラベルは更新され、新しいラベルは作成されます：

```bash
読み込んだラベル数: 9
リポジトリ your-username/your-repo にラベルを作成しています...
[1/9] ラベル 'bug' を処理中...
  既存ラベル 'bug' を更新します
  ✓ ラベル 'bug' を作成しました
[2/9] ラベル 'documentation' を処理中...
  ✓ ラベル 'documentation' を作成しました
...
成功: 9/9 個のラベルを処理しました
```

### 4. ラベル削除

対話形式で特定のラベルを削除します：

```bash
削除するラベルを選択してください
ラベル一覧を取得中...
1. bug
2. documentation
3. duplicate
4. enhancement
...
削除するラベル番号を入力してください（複数選択可、スペース区切り）:
3 4
ラベル 'duplicate' を削除中...
✓ ラベル 'duplicate' を削除しました
ラベル 'enhancement' を削除中...
✓ ラベル 'enhancement' を削除しました
```

### 5. ラベルバックアップ

現在のラベル設定をタイムスタンプ付きのJSONファイルにバックアップします：

```bash
ラベル情報を取得中...
成功: 9 個のラベル情報を labels_backup_20250309_123045.json に保存しました
ラベルを labels_backup_20250309_123045.json にバックアップしました
```

### 6. ラベル復元

バックアップしたラベル設定を復元します。バックアップファイルを指定するか、利用可能なバックアップから選択できます：

```bash
バックアップファイルを検索中...
利用可能なバックアップ:
1. labels_backup_20250308_153012.json
2. labels_backup_20250309_123045.json
復元するバックアップ番号を選択してください: 2
バックアップファイル labels_backup_20250309_123045.json からラベルを復元します
読み込んだラベル数: 9
...
```

## チーム開発での活用方法

### プロジェクトの初期設定

新しいプロジェクトを始める際は、以下の手順でマイルストーンとラベルを設定すると効率的です：

1. **プロジェクト計画の策定**

   - スプリント期間（1週間、2週間など）の決定
   - スプリント終了曜日の決定（多くの場合、金曜日）

2. **標準ラベルセットの作成**

   - `./github_labels.sh pull standard_labels.json` で既存テンプレートを取得
   - 必要に応じてJSONファイルを編集
   - `./github_labels.sh create standard_labels.json` で適用

3. **リリーススケジュールの設定**
   - `./github_milestone.sh` を実行し、オプション1を選択
   - 計画に基づき、マイルストーンを自動生成

### リポジトリ間の設定の統一

複数のリポジトリで同じラベルとマイルストーンの設定を使用する場合：

1. **マスターリポジトリでの設定**

   - 基準となるリポジトリでラベルを設定
   - `./github_labels.sh pull team_standard.json` で保存

2. **他のリポジトリへの展開**

   - 各リポジトリに移動
   - `./github_labels.sh create team_standard.json` で統一ラベルを適用

3. **マイルストーンの同期**
   - 各リポジトリで同じパラメータを使用してマイルストーンを生成

### スプリント計画の例

2ヶ月間の隔週スプリントを金曜日締めで設定する例：

```bash
開始日: 2025-01-01
終了日: 2025-02-28
スプリント終了曜日: 5（金曜日）
スプリントサイクル: 2
```

これにより、以下のマイルストーンが自動生成されます：

- 25-01-03 W01 (2025-01-03)
- 25-01-17 W03 (2025-01-17)
- 25-01-31 W05 (2025-01-31)
- 25-02-14 W07 (2025-02-14)
- 25-02-28 W09 (2025-02-28)

## トラブルシューティング

### 共通の問題と解決方法

#### GitHub CLI認証エラー

**問題:**

```bash
GitHub CLIの認証が必要です。以下のコマンドを実行してください:
gh auth login
```

**解決方法:**

1. `gh auth login` を実行
2. 画面の指示に従って認証を完了
3. 認証状態を確認: `gh auth status`

#### リポジトリ情報の取得エラー

**問題:**

```bash
エラー: Gitリポジトリが見つかりません。
```

**解決方法:**

1. GitHubリポジトリのルートディレクトリに移動
2. `git remote -v` でリモートURLを確認
3. 必要に応じてリモートを設定: `git remote add origin URL`

#### jqエラー

**問題:**

```bash
エラー: jq がインストールされていません。
```

**解決方法:**

- MacOS: `brew install jq`
- Ubuntu: `sudo apt install jq`
- CentOS/RHEL: `sudo yum install jq`

### OSごとの問題

#### Mac特有の問題

**問題:** 日付関連のコマンドでエラーが発生する

**解決方法:**

- macOSのデフォルトのdate（BSD版）を使用
- スクリプトはOS検出によりMac用のオプションを自動選択

#### Linux/WSL特有の問題

**問題:** GitHub CLIのインストールや認証の問題

**解決方法:**

1. 最新のGitHub CLIをインストール（apt経由でない場合は公式リポジトリから）
2. WSL環境では必要に応じてWindows側のcredentialをWSLと共有

## FAQ

### マイルストーン管理ツール

#### Q: マイルストーンのタイトル形式を変更できますか？

A: 現在のバージョンでは直接UIからは変更できません。カスタマイズが必要な場合はスクリプト内の `create_or_update_milestone` 関数内の以下の部分を編集してください：

```bash
title="$formatted_date W$week_number"
```

#### Q: 特定のマイルストーンだけを更新するには？

A: マイルストーン生成時に上書きの確認が表示されます。既存マイルストーンの更新のみを行いたい場合は、期間を限定して実行し、上書き確認で「y」を選択してください。

#### Q: 週番号の計算方法は？

A: ISO 8601標準に基づく週番号（%V）を使用しています。年の最初の週は、その年の最初の木曜日を含む週です。

### ラベル管理ツール

#### Q: チーム全体でラベル設定を統一するには？

A: 以下の手順で簡単に統一できます：

1. 基準となるリポジトリからラベル情報を取得: `./github_labels.sh pull standard_labels.json`
2. 他のリポジトリで同じラベルを作成: `./github_labels.sh create standard_labels.json`

#### Q: GitHubのデフォルトラベルを保持したまま新しいラベルを追加できますか？

A: はい。まず現在のラベルをバックアップし、新しいラベルをJSONファイルに追加してから作成を実行してください。ラベル名が重複しない限り、既存のラベルは維持されます。

#### Q: カスタムカラーコードを指定するには？

A: JSONファイル内で、`"color": "ff0000"` のように6桁の16進数カラーコード（#なし）を指定できます。

### 共通の質問

#### Q: GitHub Enterpriseでも使えますか？

A: はい。GitHub CLIがGitHub Enterpriseに接続できるよう設定されていれば利用可能です。

#### Q: プライベートリポジトリでも使用できますか？

A: はい。適切なアクセス権で認証されたGitHub CLIを使用していれば、プライベートリポジトリでも問題なく使用できます。

#### Q: 複数のリポジトリに対して一括で設定するには？

A: 現在のバージョンでは一度に1つのリポジトリしか処理できません。ただし、シェルスクリプトでループを作成すれば複数リポジトリへの一括適用が可能です。

---

これらのツールを活用して、GitHubプロジェクト管理を効率化しましょう！質問や改善提案がありましたら、イシューやプルリクエストでお知らせください。

---

© 2025 Your Name or Organization  
Licensed under the MIT License
