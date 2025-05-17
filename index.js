require('dotenv').config();
const express = require('express');
const { Client, middleware } = require('@line/bot-sdk');

const { handleReply } = require('./services/replyService');
const { logMessage } = require('./services/logger');

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET
};

const client = new Client(config);
const app = express();

app.post('/webhook', middleware(config), async (req, res) => {
  const events = req.body.events;

  try {
    const results = await Promise.all(events.map(async event => {
      // メッセージログをFirestoreに保存（メッセージイベントのみ対象）
      if (event.type === 'message' && event.message.type === 'text') {
        const userId = event.source?.userId || 'unknown';
        const message = event.message.text;
        await logMessage(userId, message);
      }

      // クイックリプライなどの応答処理
      return handleReply(event, client);
    }));

    res.status(200).json(results);
  } catch (err) {
    console.error('エラーが発生しました:', err);
    res.status(500).end();
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 LINE Bot server running on port ${PORT}`);
});
