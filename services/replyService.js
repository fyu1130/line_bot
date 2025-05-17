exports.handleReply = async (event, client) => {
    const replyToken = event.replyToken;
  
    if (event.type === 'message' && event.message.type === 'text') {
      const userText = event.message.text;
  
      if (userText === '予約') {
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
  
      return client.replyMessage(replyToken, {
        type: 'text',
        text: `「${userText}」を受け付けました。`
      });
    }
  };
  