import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const URI = process.env.MONGODB_URI;
    if (!URI) {
      throw new Error("❌ MONGODB_URI is missing from .env file");
    }

    await mongoose.connect(URI); // no need for options now

    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Database connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
