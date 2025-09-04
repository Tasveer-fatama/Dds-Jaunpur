import express, { Router } from "express";
const router = express.Router();
import{inquiryform } from "../controlers/Authcontrollers.js"

router.route("/inquiryform").post(inquiryform)









export default router;