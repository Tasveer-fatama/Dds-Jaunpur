import express from "express";
import multer from "multer";

import { inquiryform } from "../controlers/Authcontrollers.js";
import { createAdmission, getAdmissions } from "../controlers/admissionController.js";
import { createDonation, getDonations } from "../controlers/donationController.js";

const router = express.Router();

// 📌 Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // uploads folder project root me banana hoga
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

/* ---------- Inquiry Form Routes ---------- */
router.post("/inquiryform", inquiryform);

/* ---------- Admission Form Routes ---------- */
router.post("/admissionform", createAdmission);
router.get("/admissionform", getAdmissions);

/* ---------- Donation Routes (with screenshot upload) ---------- */
router.post("/donation", upload.single("screenshot"), createDonation);
router.get("/donation", getDonations);

export default router;
