import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: String,
  fatherName: String,
  course: String,
  duration: String,
  regNo: String,
  session: String,
  subjects: Array,
  total: Number,
  grade: String,
  pdfUrl: String
});

const Student = mongoose.model("Student", studentSchema);

export default Student;