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

## 実行手順
1. 
```bash
# プロジェクト初期化
npm init -y
# 必要なパッケージをインストール
npm install express @line/bot-sdk dotenv
```