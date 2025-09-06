import Admission from "../model/admissionModel.js";

// 🎯 Create Admission
export const createAdmission = async (req, res) => {
  try {
    const newAdmission = new Admission(req.body);
    await newAdmission.save();
    res.status(201).json({ success: true, message: "🎉 Admission successful!", data: newAdmission });
  } catch (error) {
    console.error("Admission Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// 🎯 Get All Admissions
export const getAdmissions = async (req, res) => {
  try {
    const admissions = await Admission.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: admissions });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
