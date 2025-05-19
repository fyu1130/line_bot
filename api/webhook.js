const express = require('express');
const { Client, middleware } = require('@line/bot-sdk');
const { handleReply } = require('../services/replyService');
const { logMessage } = require('../services/logger');

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET
};

const client = new Client(config);
const app = express();

app.post('/api/webhook', middleware(config), async (req, res) => {
  const events = req.body.events;

  try {
    const results = await Promise.all(events.map(async event => {
        try {
            if (event.type === 'message' && event.message.type === 'text') {
              const userId = event.source?.userId || 'unknown';
              const message = event.message.text;
              await logMessage(userId, message);
            }
            return handleReply(event, client);
          } catch (innerError) {
            console.error('[Event Handling Error]', innerError);
            return client.replyMessage(event.replyToken, {
              type: 'text',
              text: 'システムエラーが発生しました。'
            });
          }
        }));
        res.status(200).json(results);
      } catch (err) {
        console.error('[Webhook Error]', err);
        res.status(500).end();
      }
});

// ✅ Vercel用：listenしない
module.exports = app;
