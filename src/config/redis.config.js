const Redis = require('ioredis');

const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
});

const connectRedis = async () => {
    try {
      await redis.connect();
      console.log("✅ Redis connected");
    } catch (err) {
      console.error("❌ Redis connection failed:", err.message);
      process.exit(1); // 🔴 fail fast
    }
  };

module.exports = {redis, connectRedis};