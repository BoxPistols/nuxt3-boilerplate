#!/bin/bash

# 権限設定: chmod +x shells/milestone.sh
# 実行方法: ./shells/milestone.sh

# 依存関係の確認:
# jq (JSON処理) - https://stedolan.github.io/jq/download/
# gh (GitHub CLI) - https://cli.github.com/

# ページャを無効化
export PAGER=cat

# OS検出
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

# エラーハンドリング (OS共通)
handle_error() {
	echo "エラーが発生しました: $1"
	exit 1
}

# エラー発生時にスクリプトを終了するが、OS別に適切に処理
if [ "$OS_TYPE" = "linux" ]; then
	# Linuxではエラーハンドリングを有効にする
	set -e
	trap 'handle_error "$BASH_COMMAND"' ERR
else
	# Macではより寛容なエラーハンドリング（スクリプト終了なし）
	trap 'echo "警告: $BASH_COMMAND に問題が発生しましたが、処理を継続します"' ERR
fi

# OS別の日付操作関数
# 日付に日数を追加
add_days() {
	local date_str="$1"
	local days="$2"

	if [ "$OS_TYPE" = "mac" ]; then
		date -j -v+"$days"d -f "%Y-%m-%d" "$date_str" +%Y-%m-%d
	else
		date -d "$date_str +$days days" +%Y-%m-%d
	fi
}

# 次の特定曜日を取得
get_next_day_of_week() {
	local current_date="$1"
	local target_day="$2"
	local include_current_day="$3" # オプション: "y"の場合、現在日が一致していればその日を返す
	local current_day
	local day_diff

	if [ "$OS_TYPE" = "mac" ]; then
		current_day=$(date -j -f "%Y-%m-%d" "$current_date" +%u)
		day_diff=$(((target_day - current_day + 7) % 7))

		# 現在の日付が指定曜日と同じ場合の処理
		if [ $day_diff -eq 0 ]; then
			if [ "$include_current_day" = "y" ]; then
				# 現在日を含める場合はそのまま返す
				echo "$current_date"
				return
			else
				# 含めない場合は7日後を返す（従来の動作）
				day_diff=7
			fi
		fi

		date -j -v+"$day_diff"d -f "%Y-%m-%d" "$current_date" +%Y-%m-%d
	else
		current_day=$(date -d "$current_date" +%u)
		day_diff=$(((target_day - current_day + 7) % 7))

		# 現在の日付が指定曜日と同じ場合の処理
		if [ $day_diff -eq 0 ]; then
			if [ "$include_current_day" = "y" ]; then
				# 現在日を含める場合はそのまま返す
				echo "$current_date"
				return
			else
				# 含めない場合は7日後を返す（従来の動作）
				day_diff=7
			fi
		fi

		date -d "$current_date + $day_diff days" +%Y-%m-%d
	fi
}

# 週番号を取得
get_week_number() {
	local date_str="$1"

	if [ "$OS_TYPE" = "mac" ]; then
		date -j -f "%Y-%m-%d" "$date_str" +%V
	else
		date -d "$date_str" +%V
	fi
}

# 年を取得
get_year() {
	local date_str="$1"

	if [ "$OS_TYPE" = "mac" ]; then
		date -j -f "%Y-%m-%d" "$date_str" +%Y
	else
		date -d "$date_str" +%Y
	fi
}

# 曜日名を取得
get_day_of_week() {
	local date_str="$1"

	if [ "$OS_TYPE" = "mac" ]; then
		date -j -f "%Y-%m-%d" "$date_str" +%a
	else
		date -d "$date_str" +%a
	fi
}

# 日付のフォーマット変換（YY-MM-DD形式）
get_formatted_date() {
	local date_str="$1"

	if [ "$OS_TYPE" = "mac" ]; then
		date -j -f "%Y-%m-%d" "$date_str" +%y-%m-%d
	else
		date -d "$date_str" +%y-%m-%d
	fi
}

# 二つの日付を比較 (date1 <= date2 なら0、そうでなければ1を返す)
compare_dates() {
	local date1="$1"
	local date2="$2"
	local timestamp1
	local timestamp2

	if [ "$OS_TYPE" = "mac" ]; then
		timestamp1=$(date -j -f "%Y-%m-%d" "$date1" +%s)
		timestamp2=$(date -j -f "%Y-%m-%d" "$date2" +%s)
	else
		timestamp1=$(date -d "$date1" +%s)
		timestamp2=$(date -d "$date2" +%s)
	fi

	if [ "$timestamp1" -le "$timestamp2" ]; then
		return 0
	else
		return 1
	fi
}

# GitHub API関数（Mac版の順序を採用）
github_api() {
	local method="$1"
	local endpoint="$2"
	shift 2

	# エンドポイントを先に指定し、その後に追加パラメータを渡す（Mac版の方式）
	gh api --method "$method" -H "Accept: application/vnd.github+json" "$endpoint" "$@"
}

# マイルストーン操作関数
create_or_update_milestone() {
	local username="$1"
	local repo="$2"
	local title="$3"
	local due_date="$4"
	local description="$5"

	echo "処理中: $title ($due_date)" # デバッグ用

	# 既存のマイルストーンを検索
	local existing_milestone
	existing_milestone=$(github_api GET "/repos/$username/$repo/milestones" -q ".[] | select(.title == \"$title\")")

	if [ -n "$existing_milestone" ]; then
		# マイルストーンが存在する場合、更新するか確認
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

		# マイルストーンを更新
		local milestone_number
		milestone_number=$(echo "$existing_milestone" | jq -r '.number')

		if github_api PATCH "/repos/$username/$repo/milestones/$milestone_number" -f title="$title" -f due_on="${due_date}T${custom_time}:00Z" -f description="$description"; then
			echo "更新: $title (終了: $due_date ${custom_time})"
		else
			echo "エラー: $title の更新に失敗"
		fi
	else
		# 新しいマイルストーンを作成
		if github_api POST "/repos/$username/$repo/milestones" -f title="$title" -f due_on="${due_date}T${custom_time}:00Z" -f description="$description"; then
			echo "作成: $title (終了: $due_date ${custom_time})"
		else
			echo "エラー: $title の作成に失敗"
		fi
	fi
}

# マイルストーン一覧表示（両OS対応版）
list_milestones() {
	local username="$1"
	local repo="$2"

	printf "マイルストーン一覧:\n"
	printf "番号  | リリース日 週番号\n"
	printf "%s\n" "----------------------------------------"

	# マイルストーンデータを取得（両OS対応）
	local milestones_data
	milestones_data=$(github_api GET "/repos/$username/$repo/milestones?state=all")

	# デバッグ用（実際のデータをチェック）
	echo "API応答データ（最初の80文字）:" >/dev/stderr
	echo "$milestones_data" | head -c 80 >/dev/stderr
	echo "..." >/dev/stderr

	# カウンター初期化
	local counter=1

	# jqでタイトルと日付を抽出してソート
	echo "$milestones_data" | jq -r '.[] | "\(.number),\(.title),\(.due_on)"' | sort -t',' -k3 |
		while IFS=',' read -r github_number title due_date; do
			# 日付が存在するかチェック
			if [ -n "$due_date" ] && [ "$due_date" != "null" ]; then
				# 3桁のゼロ埋め連番を作成
				local formatted_counter=$(printf "%03d" $counter)

				# UTCタイムスタンプから日付部分だけを取り出す
				formatted_date=$(echo "$due_date" | sed 's/T.*Z//')

				# 連番を表示
				printf "%-5s | %s (%s)\n" "$formatted_counter" "$title" "$formatted_date"

				# カウンターをインクリメント
				((counter++))
			fi
		done
}

# 選択したマイルストーンを削除
delete_selected_milestones() {
	local username="$1"
	local repo="$2"

	# 利用可能なマイルストーン一覧を取得
	local milestones
	milestones=$(github_api GET "/repos/$username/$repo/milestones?state=all")

	echo "削除するマイルストーンを選択してください（複数選択可、スペース区切り）:"
	echo "$milestones" | jq -r '.[] | "\(.number): \(.title)"'
	read -r selected_numbers

	# 選択されたマイルストーンを削除
	for number in $selected_numbers; do
		if github_api DELETE "/repos/$username/$repo/milestones/$number"; then
			echo "マイルストーン #$number を削除しました。"
		else
			echo "エラー: マイルストーン #$number の削除に失敗しました。"
		fi
	done
}

# 全マイルストーンを削除
delete_all_milestones() {
	local username="$1"
	local repo="$2"

	# 全マイルストーン一覧を取得
	local milestones
	milestones=$(github_api GET "/repos/$username/$repo/milestones?state=all")

	# 各マイルストーンのID（number）を抽出して削除
	local milestone_numbers
	milestone_numbers=$(echo "$milestones" | jq -r '.[].number')

	for number in $milestone_numbers; do
		if github_api DELETE "/repos/$username/$repo/milestones/$number"; then
			echo "マイルストーン #$number を削除しました。"
		else
			echo "エラー: マイルストーン #$number の削除に失敗しました。"
		fi
	done
}

# リポジトリ情報を取得
get_repo_info() {
	# 既にセッション変数が設定されている場合はそれを使用
	if [ -n "$GITHUB_USERNAME" ] && [ -n "$GITHUB_REPO" ]; then
		return 0
	fi

	# gitコマンドからリモートURL情報を取得
	local remote_url
	remote_url=$(git config --get remote.origin.url)
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

# メイン処理
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
			echo "開始日が指定曜日と同じ場合、その日を含めますか？ (y/n, デフォルトはy):"
			read -r -e include_start_day
			include_start_day=${include_start_day:-y}
			echo "マイルストーンの時間を入力してください (HH:MM 形式, デフォルトは17:00):"
			read -r -e custom_time
			custom_time=${custom_time:-17:00}

			days=("月" "火" "水" "木" "金" "土" "日")
			day_name=${days[$((sprint_end_day - 1))]}

			overwrite_all=""
			current_date=$start_date

			# 開始日が指定曜日と同じ場合、その日を含めるかどうかの処理
			start_day_num=0
			if [ "$OS_TYPE" = "mac" ]; then
				start_day_num=$(date -j -f "%Y-%m-%d" "$start_date" +%u)
			else
				start_day_num=$(date -d "$start_date" +%u)
			fi
			start_day_name=${days[$((start_day_num - 1))]}
			echo "開始日 $start_date は $start_day_name曜日です"

			# デバッグ情報
			echo "スプリント終了曜日: ${day_name}曜日($sprint_end_day)"

			# 1週目の処理（開始日が指定曜日と同じかどうかをチェック）
			if [ "$start_day_num" -eq "$sprint_end_day" ] && [ "$include_start_day" = "y" ]; then
				# 開始日が指定曜日と同じで、含める設定の場合
				current_date="$start_date"
				echo "開始日が指定曜日と一致しているため、最初のスプリント終了日は $current_date になります"
			else
				# それ以外の場合は次の指定曜日を取得
				current_date=$(get_next_day_of_week "$start_date" $sprint_end_day)
				echo "最初のスプリント終了日は $current_date になります"
			fi

			# 終了日まで繰り返し処理
			while compare_dates "$current_date" "$end_date"; do
				# スプリント終了日（現在日）
				sprint_end=$current_date

				# スプリント開始日（終了日の6日前）
				sprint_start=$(add_days "$sprint_end" -6)

				# 週番号とフォーマット済み日付を取得
				week_number=$(get_week_number "$sprint_end")
				formatted_date=$(get_formatted_date "$sprint_end")

				# タイトルと説明を作成
				title="$formatted_date W$week_number"
				description="期間: $sprint_start から $sprint_end (${day_name}曜日)"

				# マイルストーンを作成/更新
				create_or_update_milestone "$GITHUB_USERNAME" "$GITHUB_REPO" "$title" "$sprint_end" "$description"

				# 次回のスプリント終了日を計算（現在の終了日の7日後）
				current_date=$(add_days "$sprint_end" 7)
			done
			;;
		2)
			# マイルストーン一覧表示
			list_milestones "$GITHUB_USERNAME" "$GITHUB_REPO"
			;;
		3)
			# 選択したマイルストーンを削除
			delete_selected_milestones "$GITHUB_USERNAME" "$GITHUB_REPO"
			;;
		4)
			# 全マイルストーン削除
			echo "全てのマイルストーンを削除します。よろしいですか？ (y/n)"
			read -r -e confirm
			if [[ $confirm == "y" ]]; then
				delete_all_milestones "$GITHUB_USERNAME" "$GITHUB_REPO"
			else
				echo "削除をキャンセルしました。"
			fi
			;;
		q | Q)
			# 終了
			exit 0
			;;
		*)
			echo "無効な選択です。"
			;;
		esac

		echo # 空行を挿入
	done
}

# 依存ツールの確認
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

if ! command -v jq &>/dev/null; then
	echo "エラー: jq がインストールされていません。"
	echo "インストール方法: https://stedolan.github.io/jq/download/"
	exit 1
fi

# スクリプト実行
main
