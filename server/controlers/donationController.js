import Donation from "../model/donationModel.js";

// 🟢 Create Donation
export const createDonation = async (req, res) => {
  try {
    const { name, email } = req.body;
    const screenshot = req.file ? req.file.filename : null;

    if (!screenshot) {
      return res.status(400).json({ message: "Screenshot is required" });
    }

    const newDonation = await Donation.create({ name, email, screenshot });

    res.status(201).json({
      message: "Donation details submitted successfully!",
      donation: newDonation,
    });
  } catch (error) {
    console.error("Donation Error:", error);
    res.status(500).json({ message: "Error while submitting donation", error });
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
