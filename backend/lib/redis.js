import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

let redis = null;

if (process.env.UPSTASH_REDIS_URL) {
  try {
    redis = new Redis(process.env.UPSTASH_REDIS_URL, {
      maxRetriesPerRequest: 1,
      retryStrategy(times) {
        if (times > 3) {
          console.log("Redis: Max retries reached, giving up.");
          return null; // stop retrying
        }
        return Math.min(times * 200, 2000);
      },
      lazyConnect: true,
    });

    redis.on("error", (err) => {
      console.log("Redis connection error (non-fatal):", err.message);
    });

    redis.on("connect", () => {
      console.log("Redis connected successfully.");
    });

    // Attempt to connect, but don't crash if it fails
    redis.connect().catch((err) => {
      console.log("Redis initial connection failed (non-fatal):", err.message);
      redis = null;
    });
  } catch (err) {
    console.log("Redis initialization failed (non-fatal):", err.message);
    redis = null;
  }
} else {
  console.log("No UPSTASH_REDIS_URL set — running without Redis.");
}

export { redis };
