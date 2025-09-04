import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import router from "./router/Inquiryroute.js";
const app = express();

connectDB();
dotenv.config();
app.use(express.json());
app.use("/api/inquiry", router);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`);
});
