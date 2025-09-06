import Inquiry from "../model/inquirymodel.js";

export const inquiryform = async (req, res) => {
  try {
    const { name, email, phone, course, message } = req.body;

    // ✅ Duplicate check (email ya phone)
    const existing = await Inquiry.findOne({ $or: [{ email }, { phone }] });
    if (existing) {
      return res.status(200).json({
        success: false,
        message: "❌ Already submitted with this email/phone!",
      });
    }

    // ✅ Save new inquiry
    const newInquiry = new Inquiry({ name, email, phone, course, message });
    await newInquiry.save();

    res.status(200).json({
      success: true,
      message: "✅ Form submitted successfully!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
