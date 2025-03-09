#!/bin/bash

# GitHub ラベル管理ツール（統合版）
# 機能：ラベルの取得・作成・削除・バックアップ・リストア
# 対応OS：Mac / Linux / WSL

# 使い方:
# - chmod +x shells/github_labels.sh で実行権限を付与
# - ./shells/github_labels.sh で対話型メニューを表示
# - または ./shells/github_labels.sh [pull|create|list|delete] [オプション] でコマンド実行

# セーフモード
set -eo pipefail

# 環境変数
VERSION="1.0.0"
SHELL_DIR="shells"
DEFAULT_LABELS_FILE="${SHELL_DIR}/labels.json"
REPO=""

# ディレクトリが存在しない場合は作成
ensure_dir_exists() {
  if [ ! -d "$1" ]; then
    mkdir -p "$1"
    echo "ディレクトリ '$1' を作成しました"
  fi
}

# 起動時にシェルディレクトリを確認
ensure_dir_exists "$SHELL_DIR"

# 環境検出
detect_os() {
  case "$(uname -s)" in
  Darwin*)
    echo "mac"
    ;;
  Linux*)
    echo "linux"
    ;;
  *)
    echo "unknown"
    ;;
  esac
}

OS_TYPE=$(detect_os)
echo "検出されたOS: $OS_TYPE"

# エラーハンドリング
handle_error() {
  echo "エラーが発生しました: $1" >&2
  exit 1
}

trap 'handle_error "$BASH_COMMAND"' ERR

# ヘルプ表示
show_help() {
  echo "GitHub ラベル管理ツール v${VERSION}"
  echo "使い方: $(basename "$0") [コマンド] [オプション]"
  echo
  echo "コマンド:"
  echo "  pull [ファイル名]  - リポジトリからラベル情報を取得してJSONファイルに保存"
  echo "                     （デフォルト: ${DEFAULT_LABELS_FILE}）"
  echo "  create [ファイル名] - JSONファイルからラベルを作成"
  echo "                     （デフォルト: ${DEFAULT_LABELS_FILE}）"
  echo "  list             - 現在のリポジトリのラベル一覧を表示"
  echo "  delete           - 対話形式でラベルを削除"
  echo "  backup           - 既存ラベルをバックアップ（日付付きファイル名）"
  echo "  restore [ファイル名] - バックアップからラベルを復元"
  echo
  echo "オプションなしで実行すると対話型メニューが表示されます"
  echo
  echo "例:"
  echo "  $(basename "$0")              # 対話型メニュー"
  echo "  $(basename "$0") pull         # ラベル情報を取得"
  echo "  $(basename "$0") create       # ラベルを作成"
  echo "  $(basename "$0") pull custom.json  # 指定ファイル名で保存"
  echo "  $(basename "$0") backup       # ラベルをバックアップ"
}

# ファイルパスを正規化する関数
normalize_path() {
  local input_path="$1"

  # パスが指定されていない場合はデフォルトを使用
  if [ -z "$input_path" ]; then
    echo "$DEFAULT_LABELS_FILE"
    return
  fi

  # パスにディレクトリ部分が含まれているかチェック
  if [[ "$input_path" == */* ]]; then
    # すでにパスが含まれている場合はそのまま使用
    echo "$input_path"
  else
    # ファイル名のみの場合は shells/ ディレクトリを追加
    echo "${SHELL_DIR}/$input_path"
  fi
}

# リポジトリ情報の自動取得（両方のスクリプトの良い部分を統合）
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

  echo "対象リポジトリ: $REPO"
}

# base64デコード関数（環境差異を吸収）
decode_base64() {
  if [ "$OS_TYPE" = "mac" ]; then
    # macOS
    echo "$1" | base64 --decode
  else
    # Linux
    echo "$1" | base64 --decode
  fi
}

# 依存コマンドのチェック
check_dependencies() {
  local missing=false

  for cmd in jq gh git base64; do
    if ! command -v $cmd &>/dev/null; then
      echo "エラー: $cmd がインストールされていません" >&2
      case $cmd in
      jq)
        echo "  インストール方法:"
        echo "    MacOS: brew install jq"
        echo "    Ubuntu/Debian: sudo apt install jq"
        echo "    CentOS/RHEL: sudo yum install jq"
        ;;
      gh)
        echo "  インストール方法: https://cli.github.com/manual/installation"
        echo "    MacOS: brew install gh"
        echo "    Ubuntu/Debian: apt install gh"
        echo "    その他: https://github.com/cli/cli#installation"
        ;;
      git)
        echo "  インストール方法:"
        echo "    MacOS: brew install git"
        echo "    Ubuntu/Debian: sudo apt install git"
        echo "    CentOS/RHEL: sudo yum install git"
        ;;
      base64)
        echo "  インストール方法:"
        echo "    MacOS: 標準搭載されています"
        echo "    Ubuntu/Debian: sudo apt install coreutils"
        echo "    CentOS/RHEL: sudo yum install coreutils"
        ;;
      esac
      missing=true
    fi
  done

  if $missing; then
    exit 1
  fi

  # GitHub CLIの認証状態を確認
  if ! gh auth status &>/dev/null; then
    echo "エラー: GitHub CLIの認証が必要です" >&2
    echo "  認証方法: gh auth login" >&2
    exit 1
  fi
}

# ラベル一覧を取得して表示
list_labels() {
  echo "ラベル一覧を取得中..."

  # ヘッダー表示
  printf "%-30s %-10s %s\n" "名前" "カラー" "説明"
  printf "%s\n" "$(printf '=%.0s' {1..80})"

  # ラベル情報の取得と表示
  gh label list --repo "$REPO" --json name,color,description |
    jq -r '.[] | [.name, .color, .description] | @tsv' |
    sort |
    while IFS=$'\t' read -r name color description; do
      # 色のプレビュー表示（ターミナルでの擬似的な表示）
      color_preview="\033[48;2;$((16#${color:0:2}));$((16#${color:2:2}));$((16#${color:4:2}))m    \033[0m"
      printf "%-30s ${color_preview} #%-7s %s\n" "$name" "$color" "$description"
    done
}

# ラベル情報をJSONとして保存
pull_labels() {
  local output_file=${1:-$DEFAULT_LABELS_FILE}
  output_file=$(normalize_path "$output_file")

  # 出力ディレクトリの確認
  local output_dir=$(dirname "$output_file")
  ensure_dir_exists "$output_dir"

  echo "ラベル情報を取得中..."
  gh label list --repo "$REPO" \
    --json name,color,description \
    --jq 'sort_by(.name)' >"$output_file"

  local count=$(jq '. | length' "$output_file")
  echo "成功: $count 個のラベル情報を $output_file に保存しました"
}

# ラベルをバックアップ
backup_labels() {
  local timestamp=$(date +"%Y%m%d_%H%M%S")
  local backup_file="${SHELL_DIR}/labels_backup_${timestamp}.json"

  # バックアップディレクトリの確認
  ensure_dir_exists "$SHELL_DIR"

  pull_labels "$backup_file"
  echo "ラベルを $backup_file にバックアップしました"
}

# JSONファイルからラベルを作成
create_labels() {
  local input_file=${1:-$DEFAULT_LABELS_FILE}
  input_file=$(normalize_path "$input_file")

  # 入力ファイルの存在確認
  if [ ! -f "$input_file" ]; then
    echo "エラー: $input_file が見つかりません" >&2
    exit 1
  fi

  # ラベル数の取得
  local total=$(jq '. | length' "$input_file")
  echo "読み込んだラベル数: $total"

  # ラベル作成
  echo "リポジトリ $REPO にラベルを作成しています..."
  local current=0
  local success=0

  for row in $(jq -r '.[] | @base64' "$input_file"); do
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
      success=$((success + 1))
    fi
  done

  echo "成功: $success/$total 個のラベルを処理しました"
}

# バックアップからラベルを復元
restore_labels() {
  local input_file=${1:-""}
  input_file=$(normalize_path "$input_file")

  # 入力ファイルが指定されていない場合、バックアップファイルを検索
  if [ -z "$input_file" ] || [ "$input_file" = "$SHELL_DIR/" ]; then
    echo "バックアップファイルを検索中..."
    local backups=($SHELL_DIR/labels_backup_*.json)

    if [ ${#backups[@]} -eq 0 ]; then
      echo "エラー: バックアップファイルが見つかりません" >&2
      exit 1
    fi

    echo "利用可能なバックアップ:"
    for i in "${!backups[@]}"; do
      echo "$((i + 1)). ${backups[$i]}"
    done

    echo -n "復元するバックアップ番号を選択してください: "
    read -r selection

    if ! [[ "$selection" =~ ^[0-9]+$ ]] || [ "$selection" -lt 1 ] || [ "$selection" -gt ${#backups[@]} ]; then
      echo "エラー: 無効な選択です" >&2
      exit 1
    fi

    input_file=${backups[$((selection - 1))]}
  fi

  echo "バックアップファイル $input_file からラベルを復元します"
  create_labels "$input_file"
}

# ラベルを対話的に削除
delete_labels() {
  echo "削除するラベルを選択してください"
  echo "ラベル一覧を取得中..."

  # ラベル一覧を取得
  local labels=($(gh label list -R "${REPO}" --json name | jq -r '.[].name'))

  if [ ${#labels[@]} -eq 0 ]; then
    echo "ラベルが存在しません"
    return
  fi

  # ラベル一覧を表示
  for i in "${!labels[@]}"; do
    echo "$((i + 1)). ${labels[$i]}"
  done

  echo "削除するラベル番号を入力してください（複数選択可、スペース区切り）:"
  read -r selections

  # 選択されたラベルを削除
  for selection in $selections; do
    if ! [[ "$selection" =~ ^[0-9]+$ ]] || [ "$selection" -lt 1 ] || [ "$selection" -gt ${#labels[@]} ]; then
      echo "警告: 無効な選択: $selection - スキップします" >&2
      continue
    fi

    local label=${labels[$((selection - 1))]}
    echo "ラベル '$label' を削除中..."

    if gh label delete "$label" -R "${REPO}" --yes; then
      echo "✓ ラベル '$label' を削除しました"
    else
      echo "警告: ラベル '$label' の削除に失敗しました" >&2
    fi
  done
}

# 対話型メニュー
show_menu() {
  while true; do
    echo
    echo "GitHub ラベル管理ツール v${VERSION}"
    echo "リポジトリ: $REPO"
    echo
    echo "操作を選択してください:"
    echo "1) ラベル一覧表示"
    echo "2) ラベル情報取得（JSON保存）"
    echo "3) ラベル作成/更新"
    echo "4) ラベル削除"
    echo "5) ラベルバックアップ"
    echo "6) ラベル復元"
    echo "q) 終了"
    echo
    read -r -p "選択: " choice

    case $choice in
    1)
      list_labels
      ;;
    2)
      read -r -p "保存ファイル名 [${DEFAULT_LABELS_FILE}]: " filename
      filename=${filename:-$DEFAULT_LABELS_FILE}
      pull_labels "$filename"
      ;;
    3)
      read -r -p "JSONファイル名 [${DEFAULT_LABELS_FILE}]: " filename
      filename=${filename:-$DEFAULT_LABELS_FILE}
      create_labels "$filename"
      ;;
    4)
      delete_labels
      ;;
    5)
      backup_labels
      ;;
    6)
      read -r -p "復元ファイル名 [自動検出]: " filename
      restore_labels "$filename"
      ;;
    q | Q)
      exit 0
      ;;
    *)
      echo "無効な選択です。もう一度お試しください。"
      ;;
    esac
  done
}

# メイン処理
main() {
  # 依存関係のチェック
  check_dependencies

  # リポジトリ情報取得
  get_repo_info

  # コマンドライン引数がない場合は対話型メニュー
  if [ $# -eq 0 ]; then
    show_menu
    exit 0
  fi

  # コマンド処理
  case "$1" in
  help | -h | --help)
    show_help
    ;;
  pull)
    pull_labels "${2}"
    ;;
  create)
    create_labels "${2}"
    ;;
  list)
    list_labels
    ;;
  delete)
    delete_labels
    ;;
  backup)
    backup_labels
    ;;
  restore)
    restore_labels "$2"
    ;;
  *)
    echo "エラー: 不明なコマンド '$1'" >&2
    show_help
    exit 1
    ;;
  esac
}

# スクリプト実行
main "$@"
