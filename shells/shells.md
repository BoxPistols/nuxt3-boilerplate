# Shellの解説

## 実行

実行コマンド例

`$ sh ./shells/pull_labels.sh`

## 基本設定

事前にGitHub CLIをインストールしておく必要があります
<https://cli.github.com/manual/installation>

クリプトに実行権限を付与する例

`$ chmod +x shells/pull_labels.sh`

`$ gh auth login`

### gh login時

- ? Where do you use GitHub? GitHub.com
- ? What is your preferred protocol for Git operations on this host? HTTPS
- ? Authenticate Git with your GitHub credentials? Yes
- ? How would you like to authenticate GitHub CLI? Login with a web browser
- ! First copy your one-time code: ABCD-1234
- Press Enter to open <https://github.com/login/device> in your browser...
- ブラウザでABCD-1234入力
