import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import inquiryroute from "./router/Inquiryroute.js";
import admissionRoutes from "./router/Inquiryroute.js";
import donationRoutes from "./router/Inquiryroute.js";
import adminRoutes from "./router/adminRoutes.js";
import certificateRoutes from "./router/certificateRoutes.js"

import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

const app = express();

// 👉 __dirname banate hi dotenv load karo with explicit path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });



// Database connect
connectDB();

// Middlewares
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://www.ddsgroupofinstitution.com",
      "https://ddsgroup.onrender.com"
    ],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api", donationRoutes);
app.use("/api/inquiry", inquiryroute);
app.use("/api/admission", admissionRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/certificate",certificateRoutes)
// Server listen
const PORT = process.env.PORT ;
app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
