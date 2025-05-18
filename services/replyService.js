const { getSession, setSession } = require('../sessions/sessionStore');

exports.handleReply = async (event, client) => {
  const replyToken = event.replyToken;

  // テキストメッセージ以外は処理しない
  if (event.type !== 'message' || event.message.type !== 'text') return;

  const userId = event.source.userId;
  const userText = event.message.text.trim();
  const session = await getSession(userId);

  // 予約開始のトリガー
  if (userText === '予約') {
    session.step = '予約開始';
    await setSession(userId, session);

    return client.replyMessage(replyToken, {
      type: 'text',
      text: 'どの時間帯の予約ですか？',
      quickReply: {
        items: [
          {
            type: 'action',
            action: {
              type: 'message',
              label: 'ランチ',
              text: 'ランチ予約'
            }
          },
          {
            type: 'action',
            action: {
              type: 'message',
              label: 'ディナー',
              text: 'ディナー予約'
            }
          }
        ]
      }
    });
  }

  // ランチ予約への応答（ステップ制御）
  if (session.step === '予約開始' && userText === 'ランチ予約') {
    session.step = '時間選択中';
    await setSession(userId, session);

    return client.replyMessage(replyToken, {
      type: 'text',
      text: 'ランチ予約を承りました。時間を選択してください。'
    });
  }

  // 通常の応答
  return client.replyMessage(replyToken, {
    type: 'text',
    text: `「${userText}」を受け付けました。`
  });
};
