import mongoose from "mongoose";

const donationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    screenshot: { type: String, required: true }, // file ka path ya URL
  },
  { timestamps: true }
);

const Donation = mongoose.model("Donation", donationSchema);

export default Donation;
