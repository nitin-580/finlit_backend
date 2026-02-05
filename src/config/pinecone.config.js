const { Pinecone } = require("@pinecone-database/pinecone");
require("dotenv").config();
const logger = require("../utils/logger");

(async () => {
  try {
    const pc = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY,
    });

    const indexes = await pc.listIndexes();

    logger.info("✅ Pinecone Connected!");
    logger.info("Available Indexes: " + JSON.stringify(indexes, null, 2));
    
  } catch (error) {
    logger.error("❌ Pinecone Connection Failed");
    logger.error(error.stack || error.message || error);
  }
})();