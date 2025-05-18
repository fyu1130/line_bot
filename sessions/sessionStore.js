const redis = require('./redisClient');

const getSession = async (userId) => {
  const session = await redis.get(`session:${userId}`);
  return session ? JSON.parse(session) : {};
};

const setSession = async (userId, data) => {
  await redis.set(`session:${userId}`, JSON.stringify(data), 'EX', 60 * 60); // 1時間有効
};

module.exports = {
  getSession,
  setSession
};
