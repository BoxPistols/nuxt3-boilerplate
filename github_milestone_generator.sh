#!/bin/bash

# GitHub API関数
github_api() {
    local method="$1"
    local endpoint="$2"
    shift 2
    gh api --method "$method" -H "Accept: application/vnd.github+json" "$endpoint" "$@"
}

# マイルストーン操作
create_or_update_milestone() {
    local username="$1"
    local repo="$2"
    local title="$3"
    local due_date="$4"
    local description="$5"

    # 既存のマイルストーンを検索
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

delete_all_milestones() {
    local milestones=$(github_api GET "/repos/$1/$2/milestones?state=all" | jq -r '.[].number')
    for number in $milestones; do
        if github_api DELETE "/repos/$1/$2/milestones/$number"; then
            echo "マイルストーン #$number を削除しました。"
        else
            echo "エラー: マイルストーン #$number の削除に失敗しました。"
        fi
    done
}

list_milestones() {
    github_api GET "/repos/$1/$2/milestones?state=all" | jq -r '.[] | "\(.number),\(.title),\(.due_on)"' | while IFS=',' read -r number title due_date; do
        jp_date=$(TZ='Asia/Tokyo' date -j -f "%Y-%m-%dT%H:%M:%SZ" "${due_date}" '+%Y年%m月%d日 (%a) %H:%M')
        echo "$number,$title,$jp_date"
    done
}

# 日付操作（macOS対応）
add_days() {
    date -j -v+"$2"d -f "%Y-%m-%d" "$1" +%Y-%m-%d
}

get_next_day_of_week() {
    local current_date=$1
    local target_day=$2
    local day_diff=$(( (target_day - $(date -j -f "%Y-%m-%d" "$current_date" +%u) + 7) % 7 ))
    if [ $day_diff -eq 0 ]; then
        day_diff=7
    fi
    date -j -v+"$day_diff"d -f "%Y-%m-%d" "$current_date" +%Y-%m-%d
}

get_week_number() {
    date -j -f "%Y-%m-%d" "$1" +%V
}

get_year() {
    date -j -f "%Y-%m-%d" "$1" +%Y
}

get_day_of_week() {
    date -j -f "%Y-%m-%d" "$1" +%a
}

format_date() {
    date -j -f "%Y-%m-%d" "$1" +%y-%m-%d
}

# メイン処理
main() {
    echo "GitHubユーザー名/組織名:"
    read -r username
    echo "リポジトリ名:"
    read -r repo

    echo "操作を選択してください:"
    echo "1) マイルストーン生成"
    echo "2) マイルストーン一覧表示"
    echo "3) 全マイルストーン削除"
    read -r choice

    case $choice in
        1)
            echo "開始日 (YYYY-MM-DD):"
            read -r start_date
            echo "終了日 (YYYY-MM-DD):"
            read -r end_date
            echo "スプリントの終了曜日を選択してください (月=1, 火=2, 水=3, 木=4, 金=5, 土=6, 日=7):"
            read -r sprint_end_day
            echo "マイルストーンの時間を入力してください (HH:MM 形式):"
            read -r custom_time
            custom_time=${custom_time:-13:00}

            days=("月" "火" "水" "木" "金" "土" "日")
            day_name=${days[$((sprint_end_day-1))]}

            overwrite_all=""
            current_date=$start_date
            while [[ "$(date -j -f "%Y-%m-%d" "$current_date" +%s)" -le "$(date -j -f "%Y-%m-%d" "$end_date" +%s)" ]]; do
                sprint_end=$(get_next_day_of_week "$current_date" $sprint_end_day)
                if [[ "$(date -j -f "%Y-%m-%d" "$sprint_end" +%s)" -gt "$(date -j -f "%Y-%m-%d" "$end_date" +%s)" ]]; then
                    break
                fi
                week_number=$(get_week_number "$sprint_end")
                year=$(get_year "$sprint_end")
                formatted_date=$(format_date "$sprint_end")
                day_of_week=$(get_day_of_week "$sprint_end")
                title="$formatted_date $day_name W$week_number"
                description="期間: $current_date から $sprint_end (${day_name}曜日)"

                create_or_update_milestone "$username" "$repo" "$title" "$sprint_end" "$description"

                current_date=$(add_days "$sprint_end" 1)
            done
            ;;
        2)
            echo "マイルストーン一覧:"
            list_milestones "$username" "$repo"
            ;;
        3)
            echo "全てのマイルストーンを削除します。よろしいですか？ (y/n)"
            read -r confirm
            if [[ $confirm == "y" ]]; then
                delete_all_milestones "$username" "$repo"
            else
                echo "削除をキャンセルしました。"
            fi
            ;;
        *)
            echo "無効な選択です。"
            ;;
    esac
}

# GitHub CLIの確認
if ! command -v gh &> /dev/null; then
    echo "エラー: GitHub CLI (gh) がインストールされていません。"
    echo "インストール方法: https://cli.github.com/"
    exit 1
fi

if ! gh auth status &> /dev/null; then
    echo "GitHub CLIの認証が必要です。以下のコマンドを実行してください:"
    echo "gh auth login"
    exit 1
fi

main
