require("dotenv").config({
    path: require("path").resolve(__dirname, ".env")
  });
  
  const express = require('express');
  const app = express();
  
  const PORT = process.env.PORT || 8000;
  
  const userRoute = require('./src/modules/auth/routes/user.routes');
  const { connectDB } = require('./src/config/mongo.config');
  const { redis, connectRedis } = require('./src/config/redis.config');
  
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  app.get('/api/v1/', (req, res) => {
    return res.json({ message: 'This is a homepage' });
  });
  
  app.use('/api/v1/auth', userRoute);
  
  async function startServer() {
    try {
      console.log("🔄 Starting server...");
  
      await connectDB();
      await connectRedis();
  
      const server = app.listen(PORT, () =>
        console.log(`🚀 Server running on PORT ${PORT}`)
      );
  
      const shutdown = async () => {
        console.log("🛑 Shutting down...");
        await redis.quit();
        server.close(() => process.exit(0));
      };
  
      process.on("SIGINT", shutdown);
      process.on("SIGTERM", shutdown);
  
    } catch (error) {
      console.error("❌ Server startup failed:", error.message);
      process.exit(1);
    }
  }
  
  startServer();
  