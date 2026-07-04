import mongoose from "mongoose";
import dns from "dns";

export const connectDB = async () => {
  try {
    // Set DNS servers to Google and Cloudflare to resolve SRV records on Windows networks/routers in development
    if (process.env.NODE_ENV !== "production") {
      dns.setServers(["8.8.8.8", "1.1.1.1"]);
    }
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("Error connecting to Mongodb", error.message);
  }
};

