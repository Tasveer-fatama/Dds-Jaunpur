import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
  name: String,
  fatherName: String,
  rollNumber: String,
  dob: String,
  course: String,
  duration: String,
  grade: String,
  totalMarks: Number,
  photo: String,
  issueDate: String,
  startDate: String,
  endDate: String,

  subjects: [
    {
      name: String,
      theory: Number,
      practical: Number,
      total: Number,
    },
  ],
});

export default mongoose.model("certificate", certificateSchema);