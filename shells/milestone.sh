#!/bin/bash

# ファイル名: milestone.sh
# 権限設定: chmod +x ./shells/milestone.sh
# 実行方法: ./shells/milestone.sh

# 依存するツール:
# - jq: https://stedolan.github.io/jq/download/
# - gh: https://cli.github.com/

# ページャを無効化
export PAGER=cat

########################################
# OS検出
########################################
detect_os() {
	case "$(uname -s)" in
	Darwin*) echo "mac" ;;
	Linux*) echo "linux" ;;
	*) echo "unsupported" ;;
	esac
}

OS_TYPE=$(detect_os)
if [[ "$OS_TYPE" == "unsupported" ]]; then
	echo "エラー: サポートされていないOSです。MacまたはLinux環境で実行してください。"
	exit 1
fi

########################################
# 日付フォーマット関数 - OS別に適切な方法を使用
########################################
format_date_for_display() {
	local date_str="$1"
	local format="$2"

	if [[ "$OS_TYPE" == "mac" ]]; then
		date -j -f "%Y-%m-%d" "$date_str" +"$format"
	else
		date -d "$date_str" +"$format"
	fi
}

########################################
# 日付を指定した日数分進める
########################################
add_days() {
	local start_date="$1"
	local days_to_add="$2"

	if [[ "$OS_TYPE" == "mac" ]]; then
		date -j -v+"$days_to_add"d -f "%Y-%m-%d" "$start_date" +%Y-%m-%d
	else
		date -d "$start_date +$days_to_add days" +%Y-%m-%d
	fi
}

########################################
# 次の指定曜日を取得
########################################
get_next_day_of_week() {
	local current_date="$1"
	local target_day="$2"
	local current_day_of_week

	if [[ "$OS_TYPE" == "mac" ]]; then
		current_day_of_week=$(date -j -f "%Y-%m-%d" "$current_date" +%u)
	else
		current_day_of_week=$(date -d "$current_date" +%u)
	fi

	local day_diff=$(((target_day - current_day_of_week + 7) % 7))
	[ $day_diff -eq 0 ] && day_diff=7

	add_days "$current_date" "$day_diff"
}

########################################
# ISO 8601形式にタイムゾーン変換して日付を生成 (日本時間 -> UTC)
########################################
convert_to_iso8601() {
	local date_str="$1"
	local time_str="$2"

	# ★★修正ポイント:
	#   HH:MM 形式をしっかり hour, min, sec に分解し、sec が空なら "00" を入れる
	#   例: "13:00" => hour=13, min=00, sec=空 -> sec=00
	IFS=':' read -r hour min sec <<<"$time_str"
	hour="${hour:-00}"
	min="${min:-00}"
	sec="${sec:-00}"

	if [[ "$OS_TYPE" == "mac" ]]; then
		# Macの場合は -j モードでTZ指定しても無視されるため、手動で9時間引く計算を行う。

		# int化
		local hour_num=$((10#$hour))
		local min_num=$((10#$min))
		local sec_num=$((10#$sec))

		# 日本時間(JST) => UTC( -9時間 )
		hour_num=$((hour_num - 9))

		# 日付またぎの場合の調整
		local new_date="$date_str"
		if ((hour_num < 0)); then
			hour_num=$((hour_num + 24))
			new_date=$(add_days "$date_str" "-1")
		fi

		# 年月日を取得し直す
		local year=$(format_date_for_display "$new_date" "%Y")
		local month=$(format_date_for_display "$new_date" "%m")
		local day=$(format_date_for_display "$new_date" "%d")

		# 2桁ゼロ埋め
		local hh=$(printf "%02d" $hour_num)
		local mm=$(printf "%02d" $min_num)
		local ss=$(printf "%02d" $sec_num)

		echo "${year}-${month}-${day}T${hh}:${mm}:${ss}Z"
	else
		# Linux環境なら単純にTZ=Asia/Tokyo→-u でOK
		# ただし time_str を "hour:min:sec" で再構成して渡す
		local fixed_time="${hour}:${min}:${sec}"
		TZ=Asia/Tokyo date -d "$date_str $fixed_time" -u +"%Y-%m-%dT%H:%M:%SZ"
	fi
}

########################################
# 日付比較
########################################
compare_dates() {
	local date1="$1"
	local date2="$2"

	local timestamp1
	local timestamp2

	if [[ "$OS_TYPE" == "mac" ]]; then
		timestamp1=$(date -j -f "%Y-%m-%d" "$date1" +%s)
		timestamp2=$(date -j -f "%Y-%m-%d" "$date2" +%s)
	else
		timestamp1=$(date -d "$date1" +%s)
		timestamp2=$(date -d "$date2" +%s)
	fi

	((timestamp1 <= timestamp2))
}

########################################
# GitHub APIラッパー関数
########################################
github_api() {
	local method="$1"
	local endpoint="$2"
	shift 2
	gh api --method "$method" -H "Accept: application/vnd.github+json" "$@" -- "$endpoint" 2>&1
}

########################################
# マイルストーン作成・更新
########################################
create_or_update_milestone() {
	local username="$1"
	local repo="$2"
	local title="$3"
	local due_date="$4"
	local description="$5"
	local custom_time="$6"

	local existing_milestone
	existing_milestone=$(github_api GET "/repos/$username/$repo/milestones" -q ".[] | select(.title == \"$title\")")

	# JST => UTC 変換
	local due_on_iso
	due_on_iso=$(convert_to_iso8601 "$due_date" "$custom_time")

	if [ -n "$existing_milestone" ]; then
		# 既存
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

		local milestone_number
		milestone_number=$(echo "$existing_milestone" | jq -r '.number')

		output=$(github_api PATCH "/repos/$username/$repo/milestones/$milestone_number" \
			-f title="$title" \
			-f due_on="$due_on_iso" \
			-f description="$description")
		status=$?

		if [ $status -eq 0 ]; then
			echo "更新: $title (終了: $due_date $custom_time)"
			echo "ISO日時: $due_on_iso"
		else
			echo "エラー: $title の更新に失敗"
			echo "詳細: $output"
		fi
	else
		# 新規
		output=$(github_api POST "/repos/$username/$repo/milestones" \
			-f title="$title" \
			-f due_on="$due_on_iso" \
			-f description="$description")
		status=$?

		if [ $status -eq 0 ]; then
			echo "作成: $title (終了: $due_date $custom_time)"
			echo "ISO日時: $due_on_iso"
		else
			echo "エラー: $title の作成に失敗"
			echo "詳細: $output"
		fi
	fi
}

########################################
# マイルストーン一覧表示
########################################
list_milestones() {
	local username="$1"
	local repo="$2"

	github_api GET "/repos/$username/$repo/milestones?state=all" |
		jq -r '.[] | "\(.number),\(.title),\(.due_on),\(.state)"' |
		(
			# ヘッダー
			printf "%-5s | %-30s | %-25s | %-10s\n" "番号" "タイトル" "期限" "状態"
			printf "%s\n" "----------------------------------------------------------------------"

			while IFS=',' read -r number title due_date state; do
				# 期限があれば JST に変換
				local jp_date="期限なし"
				if [ -n "$due_date" ] && [ "$due_date" != "null" ]; then
					if [[ "$OS_TYPE" == "mac" ]]; then
						jp_date=$(TZ='Asia/Tokyo' date -j -f "%Y-%m-%dT%H:%M:%SZ" "${due_date}" '+%Y年%m月%d日 (%a) %H:%M' 2>/dev/null || echo "不明")
					else
						jp_date=$(TZ='Asia/Tokyo' date -d "${due_date}" '+%Y年%m月%d日 (%a) %H:%M' 2>/dev/null || echo "不明")
					fi
				fi

				# 状態を日本語表示に
				local jp_state="完了"
				[ "$state" = "open" ] && jp_state="進行中"

				printf "%-5s | %-30s | %-25s | %-10s\n" "$number" "$title" "$jp_date" "$jp_state"
			done
		)
}

########################################
# 選択したマイルストーンを削除
########################################
delete_selected_milestones() {
	local username="$1"
	local repo="$2"

	echo "マイルストーン一覧を取得中..."
	local milestones
	milestones=$(github_api GET "/repos/$username/$repo/milestones?state=all")

	echo "削除するマイルストーンを選択してください（複数選択可、スペース区切り）:"
	echo "$milestones" | jq -r '.[] | "\(.number): \(.title) (\(.state))"'
	read -r selected_numbers

	for number in $selected_numbers; do
		echo "マイルストーン #$number を削除しています..."
		if github_api DELETE "/repos/$username/$repo/milestones/$number"; then
			echo "マイルストーン #$number を削除しました。"
		else
			echo "エラー: マイルストーン #$number の削除に失敗しました。"
		fi
	done
}

########################################
# 全マイルストーンを削除
########################################
delete_all_milestones() {
	local username="$1"
	local repo="$2"

	echo "全マイルストーンを取得中..."
	local milestones
	milestones=$(github_api GET "/repos/$username/$repo/milestones?state=all")
	local milestone_numbers
	milestone_numbers=$(echo "$milestones" | jq -r '.[].number')
	local total
	total=$(echo "$milestone_numbers" | wc -w)

	echo "合計 $total 件のマイルストーンを削除します..."

	for number in $milestone_numbers; do
		echo "マイルストーン #$number を削除しています..."
		if github_api DELETE "/repos/$username/$repo/milestones/$number"; then
			echo "マイルストーン #$number を削除しました。"
		else
			echo "エラー: マイルストーン #$number の削除に失敗しました。"
		fi
	done

	echo "削除完了しました。"
}

########################################
# メイン処理
########################################
main() {
	echo "===== GitHub マイルストーン管理ツール ====="
	echo "実行環境: $(uname -s) ($OS_TYPE)"

	echo "GitHubユーザー名/組織名:"
	read -r username
	echo "リポジトリ名:"
	read -r repo

	while true; do
		echo ""
		echo "操作を選択してください:"
		echo "1) マイルストーン生成"
		echo "2) マイルストーン一覧表示"
		echo "3) マイルストーン選択削除"
		echo "4) 全マイルストーン削除"
		echo "5) 終了"
		read -r choice

		case "$choice" in
		1)
			echo "開始日 (YYYY-MM-DD):"
			read -r start_date
			echo "終了日 (YYYY-MM-DD):"
			read -r end_date
			echo "スプリントの終了曜日を選択してください (月=1, 火=2, 水=3, 木=4, 金=5, 土=6, 日=7):"
			read -r sprint_end_day
			echo "スプリントサイクルを週単位で入力してください (例: 1 または 2):"
			read -r sprint_cycle
			echo "マイルストーンの時間を入力してください (HH:MM 形式, デフォルトは17:00):"
			read -r custom_time
			custom_time=${custom_time:-17:00}

			echo "マイルストーンの命名ルールを選択してください:"
			echo "1) デフォルト (YY-MM-DD W週番号)"
			echo "2) カスタム"
			read -r naming_choice

			if [ "$naming_choice" == "2" ]; then
				echo "カスタム命名ルールを入力してください (使用可能な変数: {date}, {day}, {week}, {year}):"
				read -r custom_naming
			fi

			days=("月" "火" "水" "木" "金" "土" "日")
			day_name=${days[$((sprint_end_day - 1))]}

			overwrite_all=""
			current_date="$start_date"

			# スプリント生成カウンター
			sprint_count=0

			while compare_dates "$current_date" "$end_date"; do
				# current_date から指定の曜日まで飛ぶ
				sprint_end=$(get_next_day_of_week "$current_date" "$sprint_end_day")
				# 週サイクルが >1 なら (スプリント数-1)*7日足す
				if [ "$sprint_cycle" -gt 1 ]; then
					sprint_end=$(add_days "$sprint_end" "$((sprint_cycle * 7 - 7))")
				fi

				# 終了日超えるか？
				if ! compare_dates "$sprint_end" "$end_date"; then
					break
				fi

				# 日付フォーマット
				local week_number
				week_number=$(format_date_for_display "$sprint_end" "%V")
				local year
				year=$(format_date_for_display "$sprint_end" "%Y")
				local formatted_date
				formatted_date=$(format_date_for_display "$sprint_end" "%y-%m-%d")
				local day_of_week
				day_of_week=$(format_date_for_display "$sprint_end" "%a")

				# タイトル
				if [ "$naming_choice" == "2" ]; then
					title=$(echo "$custom_naming" | sed "s/{date}/$formatted_date/g; s/{day}/$day_name/g; s/{week}/$week_number/g; s/{year}/$year/g")
				else
					title="$formatted_date W$week_number"
				fi

				description="期間: $current_date から $sprint_end (${day_name}曜日)"

				create_or_update_milestone "$username" "$repo" "$title" "$sprint_end" "$description" "$custom_time"
				sprint_count=$((sprint_count + 1))

				# 次の開始日
				current_date=$(add_days "$sprint_end" 1)
			done

			echo "合計 $sprint_count 件のスプリントマイルストーンを生成しました。"
			;;
		2)
			echo "マイルストーン一覧:"
			list_milestones "$username" "$repo"
			;;
		3)
			delete_selected_milestones "$username" "$repo"
			;;
		4)
			echo "全てのマイルストーンを削除します。よろしいですか？ (y/n)"
			read -r confirm
			if [[ "$confirm" == "y" ]]; then
				delete_all_milestones "$username" "$repo"
			else
				echo "削除をキャンセルしました。"
			fi
			;;
		5)
			echo "プログラムを終了します。"
			exit 0
			;;
		*)
			echo "無効な選択です。"
			;;
		esac

		echo "続けるにはエンターキーを押してください..."
		read -r
	done
}

########################################
# 前提条件チェック
########################################
echo "前提条件をチェックしています..."

# GitHub CLIの確認
if ! command -v gh &>/dev/null; then
	echo "エラー: GitHub CLI (gh) がインストールされていません。"
	echo "インストール方法: https://cli.github.com/"
	exit 1
fi

# 認証確認
if ! gh auth status &>/dev/null; then
	echo "エラー: GitHub CLIの認証が必要です。以下のコマンドを実行してください:"
	echo "  gh auth login"
	exit 1
fi

# jqの確認
if ! command -v jq &>/dev/null; then
	echo "エラー: jq がインストールされていません。"
	echo "インストール方法: https://stedolan.github.io/jq/download/"
	exit 1
fi

# メイン処理を開始
main
