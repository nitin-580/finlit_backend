require("dotenv").config();
const mongoose = require("mongoose");

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Mongo connected from Node");
    process.exit(0);
  } catch (err) {
    console.error("❌ Mongo connection failed", err.message);
    process.exit(1);
  }
})();
