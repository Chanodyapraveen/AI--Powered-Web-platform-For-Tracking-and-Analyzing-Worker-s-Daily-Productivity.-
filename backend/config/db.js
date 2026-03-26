const mongoose = require("mongoose");

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const connectDB = async () => {
  const maxRetries = Number(process.env.MONGODB_RETRY_ATTEMPTS || 5);
  const retryDelayMs = Number(process.env.MONGODB_RETRY_DELAY_MS || 3000);

  for (let attempt = 1; attempt <= maxRetries; attempt += 1) {
    try {
      const conn = await mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 10000,
      });
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      return;
    } catch (error) {
      const isLastAttempt = attempt === maxRetries;
      console.error(
        `MongoDB Connection Error (attempt ${attempt}/${maxRetries}): ${error.message}`,
      );

      if (isLastAttempt) {
        process.exit(1);
      }

      await wait(retryDelayMs);
    }
  }
};

module.exports = connectDB;
