import Inquiry from "../model/inquirymodel.js";
import Admission from "../model/admissionModel.js";
import Donation from "../model/donationModel.js";

// 🟢 Get All Inquiries
export const getInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.status(200).json(inquiries);
  } catch (error) {
    res.status(500).json({ message: "Error fetching inquiries", error });
  }
};

// 🟢 Get All Admissions
export const getAdmissions = async (req, res) => {
  try {
    const admissions = await Admission.find().sort({ createdAt: -1 });
    res.status(200).json(admissions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching admissions", error });
  }
};

// 🟢 Get All Donations
export const getDonations = async (req, res) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 });
    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching donations", error });
  }
};
