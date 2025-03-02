#!/bin/bash
set -eo pipefail

# カラーコード定義
RED='\033[1;31m'
GREEN='\033[1;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# リポジトリ情報取得関数
get_repo_info() {
  local remote_url
  if ! remote_url=$(git remote get-url origin 2>/dev/null); then
    echo -e "${RED}エラー: Gitリポジトリが見つかりません${NC}" >&2
    echo -e "${YELLOW}解決策: スクリプトをGitリポジトリ内で実行してください${NC}" >&2
    exit 1
  fi

  REPO=$(echo "${remote_url}" | sed -E \
    -e 's#^(git@|https://|ssh://git@)(github[.]com[:/])?##' \
    -e 's#(\.git|/)$##' \
    -e 's#[:/]#/#g' \
    -e 's#//+#/#g')

  if [[ -z "$REPO" ]]; then
    echo -e "${RED}エラー: リポジトリ情報の解析に失敗しました${NC}" >&2
    echo -e "入力値: ${remote_url}" >&2
    exit 1
  fi
}

# 依存関係チェック関数
check_dependencies() {
  local missing=()
  local required=("jq" "gh" "git")

  for cmd in "${required[@]}"; do
    if ! command -v "${cmd}" &>/dev/null; then
      missing+=("${cmd}")
    fi
  done

  if [ ${#missing[@]} -gt 0 ]; then
    echo -e "${RED}エラー: 次の必須ツールが不足しています =>${NC}" >&2
    for cmd in "${missing[@]}"; do
      case "$cmd" in
      "jq") echo -e "  - jq: JSON処理ツール (https://stedolan.github.io/jq/)" ;;
      "gh") echo -e "  - GitHub CLI: GitHub公式CLI (https://cli.github.com)" ;;
      "git") echo -e "  - Git: バージョン管理システム" ;;
      esac
    done
    exit 1
  fi
}

# ラベル作成メイン関数
create_labels() {
  local total=$(jq 'length' labels.json)
  local count=0
  local success=0
  local fail=0

  echo -e "${YELLOW}ラベル作成を開始します...${NC}"

  while IFS= read -r row; do
    ((count++))
    _jq() {
      echo "${row}" | base64 --decode | jq -r "${1}"
    }

    name=$(_jq '.name')
    color=$(_jq '.color')
    description=$(_jq '.description')

    printf "[%02d/%02d] %-25s" "${count}" "${total}" "${name}"

    if gh label create "${name}" \
      --color "${color}" \
      --description "${description}" \
      --repo "${REPO}" \
      --force >/dev/null 2>&1; then
      echo -e " ${GREEN}✓ 成功${NC}"
      ((success++))
    else
      echo -e " ${RED}✗ 失敗${NC}"
      ((fail++))
    fi
  done < <(jq -r '.[] | @base64' labels.json)

  echo -e "\n${GREEN}完了: ${success}個のラベルを作成${NC}"
  [ $fail -gt 0 ] && echo -e "${RED}警告: ${fail}個のラベル作成に失敗${NC}"
}

# メイン処理
main() {
  check_dependencies
  get_repo_info

  echo -e "\n${YELLOW}===== GitHubラベル管理ツール =====${NC}"
  echo -e "対象リポジトリ: ${GREEN}${REPO}${NC}"
  echo -e "ラベル定義ファイル: ${GREEN}labels.json${NC}"
  echo -e "処理日時: ${GREEN}$(date +"%Y-%m-%d %H:%M:%S")${NC}\n"

  if [ ! -f "labels.json" ]; then
    echo -e "${RED}エラー: labels.jsonが存在しません${NC}" >&2
    exit 1
  fi

  if ! jq empty labels.json >/dev/null 2>&1; then
    echo -e "${RED}エラー: labels.jsonの形式が不正です${NC}" >&2
    exit 1
  fi

  create_labels
}

# 実行
main "$@"
