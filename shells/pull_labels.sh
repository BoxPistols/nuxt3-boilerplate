#!/bin/bash
# スクリプトに実行権限を付与
# chmod +x shells/pull_labels.sh
#
# 実行コマンド
# $ sh ./shells/pull_labels.sh
#
# 事前にGitHub CLIをインストールしておく必要があります
# https://cli.github.com/manual/installation
# $ gh auth login
#
# ? Where do you use GitHub? GitHub.com
# ? What is your preferred protocol for Git operations on this host? HTTPS
# ? Authenticate Git with your GitHub credentials? Yes
# ? How would you like to authenticate GitHub CLI? Login with a web browser
# ! First copy your one-time code: ABCD-1234
# Press Enter to open https://github.com/login/device in your browser...

#!/bin/bash
set -eo pipefail

# リポジトリ情報の自動取得
get_repo_info() {
  local remote_url
  if ! remote_url=$(git remote get-url origin 2>/dev/null); then
    echo "エラー: Gitリポジトリが見つかりません" >&2
    exit 1
  fi

  REPO=$(echo "$remote_url" | sed -E \
    -e 's#(git@|https://)github.com[:/]##' \
    -e 's/\.git$//' \
    -e 's/:/\//')

  if [[ -z "$REPO" ]]; then
    echo "エラー: リポジトリ情報の取得に失敗しました" >&2
    exit 1
  fi
}

# 依存チェック
for cmd in jq gh git; do
  if ! command -v $cmd &>/dev/null; then
    echo "エラー: $cmd がインストールされていません" >&2
    exit 1
  fi
done

# リポジトリ情報取得
get_repo_info

# ラベル情報取得
echo "ラベル情報を取得中..."
gh label list --repo "$REPO" \
  --json name,color,description \
  --jq 'sort_by(.name)' |
  jq >labels.json

echo "ラベル情報を labels.json に保存しました"
