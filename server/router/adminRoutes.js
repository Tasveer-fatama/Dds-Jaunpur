import express from "express";
import { getInquiries, getAdmissions, getDonations } from "../controlers/adminController.js";
import Inquiry from "../model/inquirymodel.js";
import Admission from "../model/admissionModel.js";
import Donation from "../model/donationModel.js";

const router = express.Router();
 


// ✅ GET - All Inquiries
router.get("/inquiries", getInquiries);

// ✅ GET - All Admissions
router.get("/admissions", getAdmissions);

// ✅ GET - All Donations
router.get("/donations", getDonations);

// 📌 Get counts
router.get("/counts", async (req, res) => {
  try {
    const inquiry = await Inquiry.countDocuments();
    const admission = await Admission.countDocuments();
    const donation = await Donation.countDocuments();

    res.json({ inquiry, admission, donation });
  } catch (err) {
    res.status(500).json({ message: "Error fetching counts", error: err.message });
  }
});

export default router;
