import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    fatherName: {
      type: String,
      required: true,
      trim: true,
    },

    rollNumber: {
      type: String,
      required: true,
      unique: true, // 🔥 duplicate nahi hoga
    },

    dob: {
      type: String, // (agar chaho to Date bhi kar sakte ho)
      required: true,
    },

    course: {
      type: String,
      required: true,
    },

    duration: String,

    grade: String,

    totalMarks: {
      type: Number,
      required: true,
    },

    photo: {
      type: String,
      default: "",
    },

    issueDate: String,
    startDate: String,
    endDate: String,

    // ✅ subjects
    subjects: [
      {
        name: String,
        theory: Number,
        practical: Number,
        total: Number,
      },
    ],

    // ✅ PDF file name
    pdf: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true, // 🔥 createdAt, updatedAt auto
  }
);

export default mongoose.model("certificate", certificateSchema);