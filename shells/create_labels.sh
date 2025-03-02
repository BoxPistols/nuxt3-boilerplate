#!/bin/bash

# GitHub ラベル作成スクリプト

# 使い方:
# - chmod +x shells/create_labels.sh で実行権限を付与
# - GitHub CLI が必要です: https://cli.github.com/manual/installation
# - GitHub CLI でログイン済みであることを確認してください

# - リポジトリのルートディレクトリで実行してください
# - *既存ラベルがある場合は上書きされます

# - ./shells/create_labels.sh で実行
# - labels.json にラベル情報を記述

# ラベル情報の例:
# gh label list
# gh label list -R "${REPO}" --json name でリポジトリのラベル一覧を取得
# gh label delete "${name}" -R "${REPO}" --yes でラベルを削除
# gh label create "${name}" -c "${color}" -d "${description}" -R "${REPO}" でラベルを作成

set -eo pipefail

# 環境検出
IS_MACOS=false
if [[ "$(uname)" == "Darwin" ]]; then
  IS_MACOS=true
fi

# ヘルプ表示
show_help() {
  echo "GitHub ラベル作成スクリプト"
  echo "使い方: $(basename "$0") [JSONファイル]"
  echo "  JSONファイル: 省略時は labels.json"
  echo
  echo "例:"
  echo "  $(basename "$0")"
  echo "  $(basename "$0") my_labels.json"
}

# コマンドラインオプション処理
if [[ "$1" == "-h" || "$1" == "--help" ]]; then
  show_help
  exit 0
fi

# リポジトリ情報の自動取得
get_repo_info() {
  local remote_url
  if ! remote_url=$(git remote get-url origin 2>/dev/null); then
    echo "エラー: Gitリポジトリが見つかりません" >&2
    echo "このコマンドはGitリポジトリのルートディレクトリで実行してください" >&2
    exit 1
  fi

  # 異なるGit URL形式に対応
  if [[ "$remote_url" =~ ^https://github.com/ ]]; then
    # HTTPS形式: https://github.com/ユーザー/リポジトリ.git
    REPO=$(echo "$remote_url" | sed -E 's#^https://github.com/##' | sed -E 's/\.git$//')
  elif [[ "$remote_url" =~ ^git@github.com: ]]; then
    # SSH形式: git@github.com:ユーザー/リポジトリ.git
    REPO=$(echo "$remote_url" | sed -E 's#^git@github.com:##' | sed -E 's/\.git$//')
  else
    echo "エラー: サポートされていないGit URL形式です: $remote_url" >&2
    exit 1
  fi

  if [[ -z "$REPO" ]]; then
    echo "エラー: リポジトリ情報の取得に失敗しました" >&2
    exit 1
  fi
}

# base64デコード関数（環境差異を吸収）
decode_base64() {
  if $IS_MACOS; then
    # macOS
    echo "$1" | base64 --decode
  else
    # Linux
    echo "$1" | base64 --decode
  fi
}

# 依存コマンドのチェック
check_dependencies() {
  for cmd in jq gh git base64; do
    if ! command -v $cmd &>/dev/null; then
      echo "エラー: $cmd がインストールされていません" >&2
      case $cmd in
      jq)
        echo "  インストール方法:"
        echo "    MacOS: brew install jq"
        echo "    Ubuntu: sudo apt install jq"
        ;;
      gh)
        echo "  インストール方法: https://cli.github.com/manual/installation"
        ;;
      git)
        echo "  インストール方法:"
        echo "    MacOS: brew install git"
        echo "    Ubuntu: sudo apt install git"
        ;;
      esac
      exit 1
    fi
  done

  # GitHub CLIの認証状態を確認
  if ! gh auth status &>/dev/null; then
    echo "エラー: GitHub CLIの認証が必要です" >&2
    echo "  認証方法: gh auth login" >&2
    exit 1
  fi
}

# メイン処理
main() {
  # 入力ファイルの設定
  JSON_FILE=${1:-"labels.json"}

  # 依存コマンドのチェック
  check_dependencies

  # 入力ファイルの存在確認
  if [ ! -f "$JSON_FILE" ]; then
    echo "エラー: $JSON_FILE が見つかりません" >&2
    exit 1
  fi

  # リポジトリ情報取得
  get_repo_info
  echo "対象リポジトリ: $REPO"

  # ラベル数の取得
  total=$(jq '. | length' "$JSON_FILE")
  echo "読み込んだラベル数: $total"

  # ラベル作成
  echo "リポジトリ $REPO にラベルを作成しています..."
  current=0

  for row in $(jq -r '.[] | @base64' "$JSON_FILE"); do
    _jq() {
      decode_base64 "$row" | jq -r "${1}"
    }

    name=$(_jq '.name')
    color=$(_jq '.color')
    description=$(_jq '.description')

    current=$((current + 1))
    echo "[$current/$total] ラベル '${name}' を処理中..."

    # 既存ラベルのチェックと処理
    if gh label list -R "${REPO}" --json name | jq -r '.[].name' | grep -q "^${name}$"; then
      echo "  既存ラベル '${name}' を更新します"
      gh label delete "${name}" -R "${REPO}" --yes
    fi

    if ! gh label create "${name}" -c "${color}" -d "${description}" -R "${REPO}"; then
      echo "  警告: ラベル '${name}' の作成に失敗しました" >&2
      # ここではエラーを無視して続行
    else
      echo "  ✓ ラベル '${name}' を作成しました"
    fi
  done

  echo "成功: $current/$total 個のラベルを処理しました"
}

# スクリプト実行
main "$@"
