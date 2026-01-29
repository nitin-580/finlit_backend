require("dotenv").config({
  path:
    process.env.NODE_ENV === "production"
      ? ".env.production"
      : process.env.NODE_ENV === "development"
      ? ".env.local"
      : ".env"
});

const express = require("express");
const app = express();

const PORT = process.env.PORT || 8000;

// Winston logger
const logger = require("./src/utils/logger");

// Load routes & configs
logger.debug("Loading route file...");
const userRoute = require("./src/modules/auth/routes/user.routes");
logger.debug("Loaded userRoute");

const { connectDB } = require("./src/config/mongo.config");
logger.debug("Mongo config loaded");

const { redis, connectRedis } = require("./src/config/redis.config");
logger.debug("Redis config loaded");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Default route
app.get("/api/v1/", (req, res) => {
  return res.json({ message: "This is a homepage" });
});

// Auth routes
app.use("/api/v1/auth", userRoute);

// Start server
async function startServer() {
  try {
    logger.info("Starting server...");

    await connectDB();
    logger.info("MongoDB connected");

    const server = app.listen(PORT, () =>
      logger.info(`🚀 Server running on PORT ${PORT}`)
    );

    const shutdown = async () => {
      logger.warn("🛑 Shutting down...");
      await redis.quit();
      server.close(() => {
        logger.warn("Shutdown complete");
        process.exit(0);
      });
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);

  } catch (error) {
    logger.error("Server startup failed: " + error.stack);
    process.exit(1);
  }
}

startServer();