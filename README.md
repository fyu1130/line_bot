最初の流れ
① リポジトリをローカルにクローン
② Node.jsプロジェクト初期化（npm init）
③ 最低限のファイルと構成を作成
④ git pushでdevelopブランチを反映
⑤ LINE Messaging API接続（.env設定）
⑥ 動作確認用のBotコード実装
⑦ develop → main にマージ → Vercelへデプロイ

WSL2 + Node.js 22 + GitHub + Vercel
node:v22.14.0

origin	GitHub 上のリポジトリの別名
リモートリポジトリ→クローン
git checkout -b main
git push -u origin main
→編集
git checkout -b develop
git add .
git commit -m "初期構成と基本ボット処理追加"
git push origin develop
→マージ

🧱 手順⑦：Vercelでデプロイする（自動）
https://vercel.com にログイン

「New Project」→ line_bot を選択
項目	設定内容
Framework Preset	Other（ExpressなどNode.js用）



## 実行手順
1. 
```bash
# プロジェクト初期化
npm init -y
# 必要なパッケージをインストール
npm install express @line/bot-sdk dotenv
```