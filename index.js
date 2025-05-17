require('dotenv').config();
const express = require('express');
const { Client, middleware } = require('@line/bot-sdk');

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET
};

const client = new Client(config);
const app = express();

app.post('/webhook', middleware(config), async (req, res) => {
  const events = req.body.events;
  const results = await Promise.all(events.map(event => {
    if (event.type === 'message' && event.message.type === 'text') {
      return client.replyMessage(event.replyToken, {
        type: 'text',
        text: `あなたの入力：「${event.message.text}」`
      });
    }
  }));
  res.json(results);
});

const { handleReply } = require('./services/replyService');

app.post('/webhook', middleware(config), async (req, res) => {
  const events = req.body.events;
  const results = await Promise.all(events.map(event => handleReply(event, client)));
  res.json(results);
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
