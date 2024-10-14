# Lighthouse CI（LHCI）をMacおよびLinux WSL2環境で両立させるためのガイド

使用方法の説明
スクリプトに実行権限を付与（最初に一度だけ実行）：

```sh
chmod +x scripts/lighthouse-manager.js
```

必要なパッケージのインストール（Linux WSL2の場合）：

```sh
sudo apt-get update
sudo apt-get install -y xdg-utils
```

xdg-utilsにはxdg-openコマンドが含まれています。
スクリプトの実行：

レポートのリネームと処理：

```sh
./scripts/lighthouse-manager.js rename-and-process
```

レポートを開く（最新の1件）：

```sh
./scripts/lighthouse-manager.js open
```

古いレポートのクリーンアップ：

```sh
./scripts/lighthouse-manager.js clean
```

全てのレポートを削除する場合：

```sh
./scripts/lighthouse-manager.js clean all
```

---

## 目次

1. [はじめに](#%E3%81%AF%E3%81%98%E3%82%81%E3%81%AB)
2. [問題の概要](#%E5%95%8F%E9%A1%8C%E3%81%AE%E6%A6%82%E8%A6%81)
3. [解決策の概要](#%E8%A7%A3%E6%B1%BA%E7%AD%96%E3%81%AE%E6%A6%82%E8%A6%81)
4. [Mac環境での設定（既存の設定を保持）](#mac%E7%92%B0%E5%A2%83%E3%81%A7%E3%81%AE%E8%A8%AD%E5%AE%9A%E6%97%A2%E5%AD%98%E3%81%AE%E8%A8%AD%E5%AE%9A%E3%82%92%E4%BF%9D%E6%8C%81)
5. [WSL2環境での設定](#wsl2%E7%92%B0%E5%A2%83%E3%81%A7%E3%81%AE%E8%A8%AD%E5%AE%9A)
   - [5.1 WSL2にChrome/Chromiumをインストール](#51-wsl2%E3%81%ABchromechromium%E3%82%92%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB)
   - [5.2 環境変数`CHROME_PATH`の設定](#52-%E7%92%B0%E5%A2%83%E5%A4%89%E6%95%B0chrome_path%E3%81%AE%E8%A8%AD%E5%AE%9A)
   - [5.3 `lighthouserc.js`の設定を調整](#53-lighthousercjs%E3%81%AE%E8%A8%AD%E5%AE%9A%E3%82%92%E8%AA%BF%E6%95%B4)
6. [環境に応じた設定の自動化](#%E7%92%B0%E5%A2%83%E3%81%AB%E5%BF%9C%E3%81%98%E3%81%9F%E8%A8%AD%E5%AE%9A%E3%81%AE%E8%87%AA%E5%8B%95%E5%8C%96)
7. [両方の環境でのテスト](#%E4%B8%A1%E6%96%B9%E3%81%AE%E7%92%B0%E5%A2%83%E3%81%A7%E3%81%AE%E3%83%86%E3%82%B9%E3%83%88)
8. [追加の注意点](#%E8%BF%BD%E5%8A%A0%E3%81%AE%E6%B3%A8%E6%84%8F%E7%82%B9)
9. [まとめ](#%E3%81%BE%E3%81%A8%E3%82%81)
10. [参考情報](#%E5%8F%82%E8%80%83%E6%83%85%E5%A0%B1)

---

## はじめに

このドキュメントでは、**Lighthouse CI（LHCI）** を **Mac** と **Windows Subsystem for Linux 2（WSL2）** の両方の環境で動作させる方法を説明します。Mac環境の既存の設定を変更せずに、WSL2環境でもLHCIを正常に動作させることを目指します。

---

## 問題の概要

LHCIをWSL2環境で実行すると、以下のようなエラーが発生することがあります。

```css
Unable to connect to Chrome
```

**原因:**

- WSL2のLinux環境にChromeまたはChromiumがインストールされていない。
- LHCIがChromeの実行ファイルを見つけられない。
- WSL2でGUIアプリケーション（Chrome）の起動に問題がある。

---

## 解決策の概要

- **Mac環境**：既存の設定を変更せず、そのままLHCIを使用します。
- **WSL2環境**：ChromeまたはChromiumをWSL2にインストールし、LHCIがそれを認識できるように設定します。
- **環境に応じた設定**：`lighthouserc.js`を調整し、環境ごとに適切な設定を適用します。

---

## Mac環境での設定（既存の設定を保持）

Mac環境では、特別な設定は必要ありません。LHCIはMac上でChromeを自動的に検出し、正常に動作します。

---

## WSL2環境での設定

WSL2環境でLHCIを動作させるために、以下の手順を実行します。

### 5.1 WSL2にChrome/Chromiumをインストール

WSL2はLinux環境であり、パッケージマネージャを使用してChromeまたはChromiumをインストールできます。

#### **Chromiumのインストール**

ChromiumはChromeのオープンソース版であり、GUIなしでヘッドレスモードで実行できます。

```bash
sudo apt-get update
sudo apt-get install -y chromium-browser
```

**注意:** ChromiumはUbuntu 20.04以降ではSnapパッケージとして提供されており、ヘッドレスモードでの動作に問題があることがあります。その場合、代替手段としてChromeをインストールします。

#### **Google Chromeのインストール**

1. **Google ChromeのDebianパッケージをダウンロード**

   ```bash
   wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
   ```

2. **パッケージをインストール**

   ```bash
   sudo apt install -y ./google-chrome-stable_current_amd64.deb
   ```

   **注意:** インストール中に依存関係のエラーが発生した場合、以下のコマンドで修正します。

   ```bash
   sudo apt --fix-broken install
   ```

3. **インストールを確認**

   ```bash
   which google-chrome
   ```

   パスが表示されれば、インストールは成功です。

### 代替案

パッケージマネージャを使用してChromeをインストールする

ユーザーが公式のGoogle Chromeリポジトリをシステムに追加し、aptを使用してChromeをインストールできるようにします。

手順:

#### GoogleのGPGキーを追加

wget -q -O - <https://dl.google.com/linux/linux_signing_key.pub> | sudo apt-key add -

#### Google Chromeリポジトリを追加

echo 'deb [arch=amd64] <http://dl.google.com/linux/chrome/deb/> stable main' | sudo tee /etc/apt/sources.list.d/google-chrome.list

#### パッケージリストを更新

sudo apt update

#### Google Chromeをインストール

sudo apt install -y google-chrome-stable
これにより、リポジトリに大きなファイルを含めずに、ユーザーがChromeをインストールできます。

### 5.2 環境変数`CHROME_PATH`の設定

LHCIがChromeの実行ファイルを見つけられるように、環境変数`CHROME_PATH`を設定します。

1. **Chromeの実行ファイルのパスを確認**

   - **Chromiumの場合:**

     ```bash
     which chromium-browser
     ```

   - **Google Chromeの場合:**

     ```bash
     which google-chrome
     ```

2. **環境変数を設定**

   ```bash
   export CHROME_PATH=$(which google-chrome)
   ```

   または、`~/.zshrc`に追加して永続化します。

   ```bash
   echo 'export CHROME_PATH=$(which google-chrome)' >> ~/.zshrc
   source ~/.zshrc
   ```

## ブラウザが普段使っているChromeではなく、新たなブラウザが起動する\*\*

スクリプトを実行してレポートを開く際に、普段使用しているChromeではなく、別のブラウザが起動してしまうとのことですね。

**考えられる原因と解決策:**

1. **WSL2でのデフォルトブラウザの問題**

   - WSL2でファイルを開く際、Linux環境のデフォルトブラウザが使用されます。これがWindows側のChromeではない可能性があります。
   - `xdg-open`や`open`コマンドは、Linux環境で設定されたデフォルトのアプリケーションを使用します。

2. **WSL2からWindowsの既定のブラウザを使用する**

   - WSL2からWindows側のブラウザを起動するようにスクリプトを調整します。
   - **方法1: `wslview`コマンドを使用する**

     - **`wslu`パッケージをインストール**

       ```bash
       sudo apt install wslu
       ```

     - **スクリプトの修正**

       ```javascript
       // OSに応じてファイルを開くコマンドを設定
       let cmd
       if (process.platform === 'win32') {
         cmd = 'start'
       } else if (process.platform === 'darwin') {
         cmd = 'open'
       } else if (process.platform === 'linux') {
         const isWSL = os.release().toLowerCase().includes('microsoft')
         if (isWSL) {
           cmd = 'wslview' // WSL2でWindowsのアプリケーションを使用
         } else {
           cmd = 'xdg-open'
         }
       } else {
         cmd = 'open'
       }
       ```

     - **`openReports`関数はそのままで問題ありません**

   - **方法2: Windowsの`explorer.exe`を使用する**

     ```javascript
     let cmd
     if (process.platform === 'win32') {
       cmd = 'start'
     } else if (process.platform === 'darwin') {
       cmd = 'open'
     } else if (process.platform === 'linux') {
       const isWSL = os.release().toLowerCase().includes('microsoft')
       if (isWSL) {
         cmd = 'explorer.exe' // Windowsのエクスプローラーを使用
       } else {
         cmd = 'xdg-open'
       }
     } else {
       cmd = 'open'
     }
     ```

     - **ファイルパスをWindows形式に変換**

       ```javascript
       // WSL2環境でファイルパスをWindows形式に変換
       if (isWSL) {
         const winPath = file
           .replace('/mnt/', '')
           .replace('/', '\\')
           .replace('/', '\\')
         exec(`${cmd} "${winPath}"`, error => {
           // エラーハンドリング
         })
       } else {
         exec(`${cmd} "${file}"`, error => {
           // エラーハンドリング
         })
       }
       ```

3. **Windows側でChromeを既定のブラウザに設定する**

   - Windowsの設定で、既定のブラウザがChromeになっていることを確認します。
     - **手順:**
       - 設定 > アプリ > 既定のアプリ > Webブラウザー
       - Google Chromeを選択

---

**まとめ:**

- **問題1の解決策:**
  - `.deb`ファイルをGitリポジトリから削除し、`.gitignore`に追加
  - ドキュメントにChromeのインストール手順を記載
- **問題2の解決策:**
  - スクリプトを修正し、WSL2からWindowsのChromeを起動するように設定
  - 必要に応じて`wslu`パッケージをインストールし、`wslview`を使用
  - Windows側でChromeを既定のブラウザに設定

**補足情報:**

- **WSL2でのファイルパスの扱い:**

  - WSL2内のパスをWindows形式に変換する際、`wslpath`コマンドを使用できます。

    ```bash
    wslpath -w /mnt/c/Users/username/path/to/file
    ```

  - スクリプト内で使用する場合、Node.jsのコードでシェルコマンドを実行する必要があります。

- **`wslview`の利点:**
  - `wslview`はWSLからWindowsの既定のアプリケーションでファイルやURLを開くためのコマンドです。
  - パス変換を自動的に行うため、コードがシンプルになります。

---

### 5.3 `lighthouserc.js`の設定を調整

プロジェクトのルートディレクトリにある`lighthouserc.js`を以下のように編集します。

```js
module.exports = {
  ci: {
    collect: {
      numberOfRuns: 1,
      chromePath: process.env.CHROME_PATH,
      chromeFlags: '--headless --no-sandbox',
      url: ['http://localhost:40125/'], // 対象のURLを指定
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
}
```

---

## 環境に応じた設定の自動化

MacとWSL2の両方の環境で同じコードベースを使用し、環境ごとに適切な設定を自動的に適用するようにします。

```js
const os = require('os')

// 現在のプラットフォームを取得
const platform = os.platform()

// WSL2環境かどうかを判定
const isWSL =
  platform === 'linux' && os.release().toLowerCase().includes('microsoft')

// 環境に応じてChromeのパスを設定
const chromePath =
  process.env.CHROME_PATH || (isWSL ? '/usr/bin/google-chrome' : undefined)

// 環境に応じてChromeのフラグを設定
const chromeFlags = isWSL ? '--headless --no-sandbox' : ''

module.exports = {
  ci: {
    collect: {
      numberOfRuns: 1,
      chromePath,
      chromeFlags,
      url: ['http://localhost:40125/'], // 対象のURLを指定
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
}
```

---

## 両方の環境でのテスト

### **Mac環境でのテスト**

```bash
yarn build && lhci autorun
```

問題なく実行されることを確認します。

### **WSL2環境でのテスト**

```bash
yarn build && lhci autorun
```

エラーが発生せず、正常に実行されることを確認します。

---

## 追加の注意点

- **Chromeのバージョン確認**
  WSL2環境でインストールしたChrome/Chromiumが最新バージョンであることを確認します。
- **権限の問題**
  `--no-sandbox`フラグはセキュリティ上のリスクがあるため、開発環境でのみ使用してください。
- **環境変数の確認**
  `echo $CHROME_PATH`を実行し、正しいパスが設定されていることを確認します。

---

## まとめ

- **Mac環境を変更せずに維持**：既存の設定を保持し、Mac環境での開発を継続できます。
- **WSL2環境での設定追加**：Chromeをインストールし、適切な環境変数と設定を追加することで、LHCIを正常に動作させます。
- **環境に応じた設定の自動化**：`lighthouserc.js`で環境を判定し、適切な設定を自動的に適用します。

---

## 参考情報

- [Windows Subsystem for Linux 公式ドキュメント](https://docs.microsoft.com/ja-jp/windows/wsl/)
- [Lighthouse CI GitHubリポジトリ](https://github.com/GoogleChrome/lighthouse-ci)
- [Lighthouse CI 設定ガイド](https://github.com/GoogleChrome/lighthouse-ci/blob/main/docs/configuration.md)

---

**注意:** 本番環境での使用やセキュリティが重要な環境では、`--no-sandbox`フラグを使用しないようにしてください。また、環境に応じて適切なセキュリティ設定を行ってください。

---

これで、MacとWSL2の両方の環境でLHCIを両立させるための設定が完了しました。

---

## **追加の設定と注意点**

### **1. `wslu`パッケージのインストール（WSL2環境）**

`wslview`コマンドを使用するために、WSL2環境で`wslu`パッケージをインストールする必要があります。

```bash
sudo apt update
sudo apt install -y wslu
```

### **2. Chromeのインストール**

#### **Linux WSL2環境**

- **`google-chrome-stable_current_amd64.deb`ファイルをGitリポジトリに含めない**
  - `.deb`ファイルは大きいため、リポジトリに含めず、ユーザーが自分でダウンロードしてインストールするようにします。
- **Chromeのインストール手順をドキュメントに記載**

  ````markdown
  ### WSL2（Ubuntu）でのGoogle Chromeのインストール

  1. **GoogleのGPGキーを追加**

     ```bash
     wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | sudo apt-key add -
     ```
  ````

  1. **Google Chromeリポジトリを追加**

     ```bash
     sudo sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list'
     ```

  1. **パッケージリストを更新**

     ```bash
     sudo apt update
     ```

  1. **Google Chromeをインストール**

     ```bash
     sudo apt install -y google-chrome-stable
     ```

- **Chromiumの代替案**

  - Chromiumを使用する場合、以下のコマンドでインストールします。

    ```bash
    sudo apt install -y chromium-browser
    ```

  - ただし、Chromeと同等の動作を保証するため、できればGoogle Chromeを使用することをおすすめします。

#### **Mac環境**

- 特別な設定は不要で、既存の環境をそのまま使用できます。

### **3. `.gitignore`ファイルの設定**

`.deb`ファイルやその他の大きなファイルをGitリポジトリに含めないように、`.gitignore`ファイルに追加します。

```bash
# 不要なファイルを除外
google-chrome-stable_current_amd64.deb
```

### **4. Windowsの既定のブラウザ設定**

- Windows側でChromeが既定のブラウザになっていることを確認します。
  - **設定手順**
    - 設定 > アプリ > 既定のアプリ > Webブラウザー
    - 「Google Chrome」を選択

### **5. スクリプトの実行権限の付与**

- スクリプトに実行権限を付与します。

  ```bash
  chmod +x scripts/lighthouse-manager.js
  ```

---

## **使用方法**

### **1. レポートのリネームと処理**

```bash
./scripts/lighthouse-manager.js rename-and-process
```

### **2. レポートを開く（最新の1件）**

```bash
./scripts/lighthouse-manager.js open
```

### **3. 古いレポートのクリーンアップ**

- 30日以上経過したレポートを削除

  ```bash
  ./scripts/lighthouse-manager.js clean
  ```

- 全てのレポートを削除

  ```bash
  ./scripts/lighthouse-manager.js clean all
  ```

---

## **まとめ**

- **コードを修正し、MacとLinux WSL2の両方で動作するようにしました。**
- **`wslview`を使用して、WSL2環境でも普段使用しているWindowsのChromeでレポートを開くことができます。**
- **大きなファイル（`.deb`など）をGitリポジトリに含めないようにし、ユーザーが自分でChromeをインストールできるようにドキュメントを整備しました。**
- **個々の環境での書き換えが不要となるように、環境依存の部分を自動的に処理するようにしました。**

---

## キャッシュ問題

```sh
echo 'export LH_TMP_DIR=/tmp' >> ~/.zshrc
echo 'export TMPDIR=/tmp' >> ~/.zshrc
source ~/.zshrc
```
