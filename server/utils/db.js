import mongoose from "mongoose";

const URI =
  "mongodb+srv://DDSgroup:99887700@cluster0.nepvtvp.mongodb.net/Ddsgroup?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Database connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
