#!/bin/bash

# 権限設定: chmod +x shells/milestone_linux.sh

# 実行方法: ./shells/milestone_linux.sh

# 入っていなければ
# jq https://stedolan.github.io/jq/download/
# gh https://cli.github.com/

# ページャを無効化
export PAGER=cat

# エラー時にスクリプトを終了し、デバッグ情報を表示
set -e

# スクリプトの先頭に追加
handle_error() {
  echo "エラーが発生しました: $1"
  exit 1
}

trap 'handle_error "$BASH_COMMAND"' ERR

# GitHub API関数
github_api() {
  local method="$1"
  local endpoint="$2"
  shift 2
  gh api --method "$method" -H "Accept: application/vnd.github+json" "$@" "$endpoint" 2>/dev/null
}

# マイルストーン操作
create_or_update_milestone() {
  local username="$1"
  local repo="$2"
  local title="$3"
  local due_date="$4"
  local description="$5"

  local existing_milestone=$(github_api GET "/repos/$username/$repo/milestones" -q ".[] | select(.title == \"$title\")")

  if [ -n "$existing_milestone" ]; then
    if [ "$overwrite_all" != "y" ]; then
      echo "マイルストーン '$title' は既に存在します。上書きしますか？ (y/n/all)"
      read -r overwrite
      if [ "$overwrite" == "all" ]; then
        overwrite_all="y"
      elif [ "$overwrite" != "y" ]; then
        echo "マイルストーン '$title' をスキップしました。"
        return
      fi
    fi

    local milestone_number=$(echo "$existing_milestone" | jq -r '.number')
    if github_api PATCH "/repos/$username/$repo/milestones/$milestone_number" -f title="$title" -f due_on="${due_date}T${custom_time}:00Z" -f description="$description"; then
      echo "更新: $title (終了: $due_date ${custom_time})"
    else
      echo "エラー: $title の更新に失敗"
    fi
  else
    if github_api POST "/repos/$username/$repo/milestones" -f title="$title" -f due_on="${due_date}T${custom_time}:00Z" -f description="$description"; then
      echo "作成: $title (終了: $due_date ${custom_time})"
    else
      echo "エラー: $title の作成に失敗"
    fi
  fi
}

delete_selected_milestones() {
  local username="$1"
  local repo="$2"
  local milestones=$(github_api GET "/repos/$username/$repo/milestones?state=all")
  echo "削除するマイルストーンを選択してください（複数選択可、スペース区切り）:"
  echo "$milestones" | jq -r '.[] | "\(.number): \(.title)"'
  read -r selected_numbers

  for number in $selected_numbers; do
    if github_api DELETE "/repos/$username/$repo/milestones/$number"; then
      echo "マイルストーン #$number を削除しました。"
    else
      echo "エラー: マイルストーン #$number の削除に失敗しました。"
    fi
  done
}

delete_all_milestones() {
  local username="$1"
  local repo="$2"
  local milestones=$(github_api GET "/repos/$username/$repo/milestones?state=all")
  local milestone_numbers=$(echo "$milestones" | jq -r '.[].number')

  for number in $milestone_numbers; do
    if github_api DELETE "/repos/$username/$repo/milestones/$number"; then
      echo "マイルストーン #$number を削除しました。"
    else
      echo "エラー: マイルストーン #$number の削除に失敗しました。"
    fi
  done
}

list_milestones() {
  local username="$1"
  local repo="$2"

  printf "マイルストーン一覧:\n"
  printf "番号 | リリース日 週番号\n"
  printf "%s\n" "----------------------------------------"

  # マイルストーンの取得とソート（日付順）
  github_api GET "/repos/$username/$repo/milestones?state=all" |
    jq -r '.[] | "\(.number),\(.title),\(.due_on)"' |
    sort -t',' -k3 |
    awk -F',' '{
      gsub("T.*Z", "", $3)  # UTCタイムスタンプから時間部分を削除
      print $0
    }' |
    awk -F',' 'BEGIN{count=1} {print count++","$2","$3}' |
    while IFS=',' read -r number title due_date; do
      if [ -n "$due_date" ] && [ "$due_date" != "null" ]; then
        printf "%-5s | %s\n" "$number" "$title"
      fi
    done
}

# 日付操作関数
add_days() {
  date -d "$1 +$2 days" +%Y-%m-%d
}

get_next_day_of_week() {
  local current_date=$1
  local target_day=$2
  local current_day=$(date -d "$current_date" +%u)
  local day_diff=$(((target_day - current_day + 7) % 7))
  if [ $day_diff -eq 0 ]; then
    day_diff=7
  fi
  date -d "$current_date + $day_diff days" +%Y-%m-%d
}

get_week_number() {
  date -d "$1" +%V
}

get_year() {
  date -d "$1" +%Y
}

get_day_of_week() {
  date -d "$1" +%a
}

get_formatted_date() {
  date -d "$1" +%y-%m-%d
}

to_jst() {
  local utc_date="$1"
  date -d "$utc_date +9 hours" "+%Y-%m-%d %H:%M:%S"
}

date_range() {
  local start_date="$1"
  local end_date="$2"
  echo "$start_date から $end_date"
}

# リポジトリ情報を取得する関数を追加
get_repo_info() {
  # 既にセッション変数が設定されている場合はそれを使用
  if [ -n "$GITHUB_USERNAME" ] && [ -n "$GITHUB_REPO" ]; then
    return 0
  fi

  # gitコマンドからリモートURL情報を取得
  local remote_url=$(git config --get remote.origin.url)
  if [ -z "$remote_url" ]; then
    echo "エラー: Gitリポジトリが見つかりません。"
    exit 1
  fi

  # GitHub URLからユーザー名とリポジトリ名を抽出
  if [[ $remote_url =~ github\.com[:/]([^/]+)/([^/.]+)(.git)?$ ]]; then
    GITHUB_USERNAME="${BASH_REMATCH[1]}"
    GITHUB_REPO="${BASH_REMATCH[2]}"
    echo "リポジトリ情報: $GITHUB_USERNAME/$GITHUB_REPO"
  else
    echo "エラー: GitHubリポジトリのURLを解析できません。"
    exit 1
  fi
}

# メイン処理を修正
main() {
  # 初回実行時にリポジトリ情報を取得
  get_repo_info

  while true; do
    echo "操作を選択してください:"
    echo "1) マイルストーン生成"
    echo "2) マイルストーン一覧表示"
    echo "3) マイルストーン選択削除"
    echo "4) 全マイルストーン削除"
    echo "q) 終了"
    read -r choice

    case $choice in
    1)
      echo "開始日 (YYYY-MM-DD):"
      read -r -e start_date
      echo "終了日 (YYYY-MM-DD):"
      read -r -e end_date
      echo "スプリントの終了曜日を選択してください (月=1, 火=2, 水=3, 木=4, 金=5, 土=6, 日=7):"
      read -r -e sprint_end_day
      echo "スプリントサイクルを週単位で入力してください (例: 1 または 2):"
      read -r -e sprint_cycle
      echo "マイルストーンの時間を入力してください (HH:MM 形式, デフォルトは17:00):"
      read -r -e custom_time
      custom_time=${custom_time:-17:00}

      days=("月" "火" "水" "木" "金" "土" "日")
      day_name=${days[$((sprint_end_day - 1))]}

      overwrite_all=""
      current_date=$start_date
      while [[ "$(date -d "$current_date" +%s)" -le "$(date -d "$end_date" +%s)" ]]; do
        sprint_end=$(get_next_day_of_week "$current_date" $sprint_end_day)
        if [[ "$(date -d "$sprint_end" +%s)" -gt "$(date -d "$end_date" +%s)" ]]; then
          break
        fi
        week_number=$(get_week_number "$sprint_end")
        formatted_date=$(get_formatted_date "$sprint_end")

        title="$formatted_date W$week_number"
        description="期間: $current_date から $sprint_end (${day_name}曜日)"

        create_or_update_milestone "$GITHUB_USERNAME" "$GITHUB_REPO" "$title" "$sprint_end" "$description"

        current_date=$(add_days "$sprint_end" 1)
      done
      ;;
    2)
      echo "マイルストーン一覧:"
      list_milestones "$GITHUB_USERNAME" "$GITHUB_REPO"
      ;;
    3)
      delete_selected_milestones "$GITHUB_USERNAME" "$GITHUB_REPO"
      ;;
    4)
      echo "全てのマイルストーンを削除します。よろしいですか？ (y/n)"
      read -r -e confirm
      if [[ $confirm == "y" ]]; then
        delete_all_milestones "$GITHUB_USERNAME" "$GITHUB_REPO"
      else
        echo "削除をキャンセルしました。"
      fi
      ;;
    q | Q)
      exit 0
      ;;
    *)
      echo "無効な選択です。"
      ;;
    esac

    echo # 空行を挿入
  done
}

# GitHub CLIの確認
if ! command -v gh &>/dev/null; then
  echo "エラー: GitHub CLI (gh) がインストールされていません。"
  echo "インストール方法: https://cli.github.com/"
  exit 1
fi

if ! gh auth status &>/dev/null; then
  echo "GitHub CLIの認証が必要です。以下のコマンドを実行してください:"
  echo "gh auth login"
  exit 1
fi

# jqが入っていなければ
if ! command -v jq &>/dev/null; then
  echo "エラー: jq がインストールされていません。"
  echo "インストール方法: https://stedolan.github.io/jq/download/"
  exit 1
fi

main
