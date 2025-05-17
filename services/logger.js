const db = require('../firebase/firestore');

exports.logMessage = async (userId, message) => {
  await db.collection('messages').add({
    userId,
    message,
    timestamp: new Date()
  });
};
