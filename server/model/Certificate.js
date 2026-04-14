import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  theoryMarks: { type: Number, required: true, min: 0 },
  practicalMarks: { type: Number, required: true, min: 0 },
  maxTheory: { type: Number, default: 75 },
  maxPractical: { type: Number, default: 25 },
  totalMarks: { type: Number }
});

const studentSchema = new mongoose.Schema({
  studentName: { type: String, required: true, trim: true },
  fatherName: { type: String, required: true, trim: true },
  motherName: { type: String, required: true, trim: true },
  registrationNumber: { type: String, required: true, unique: true, trim: true },
  rollNumber: { type: String, required: true, trim: true },
  courseName: { type: String, required: true, trim: true },
  courseCode: { type: String, trim: true },
  centerOfExamination: { type: String, default: 'DDS Group of Institutions' },
  ivetVlcsCode: { type: String, trim: true },
  sessionFrom: { type: String, required: true },
  sessionTo: { type: String, required: true },
  issueDate: { type: String, required: true },
  duration: { type: String, default: '01 Year' },
  subjects: [subjectSchema],
  theoryObtained: { type: Number, default: 0 },
  practicalObtained: { type: Number, default: 0 },
  totalObtained: { type: Number, default: 0 },
  totalMax: { type: Number, default: 400 },
  percentage: { type: Number, default: 0 },
  grade: { type: String, enum: ['A+', 'A', 'B+', 'B', 'C', 'F'], default: 'A' },
  result: { type: String, enum: ['PASS', 'FAIL'], default: 'PASS' },
  photoUrl: { type: String, default: '' },
  pdfUrl: { type: String, default: '' },
  qrCodeData: { type: String, default: '' },
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

// Auto-calculate totals before save
studentSchema.pre('save', function(next) {
  if (this.subjects && this.subjects.length > 0) {
    let totalObtained = 0;
    let totalMax = 0;

    this.subjects.forEach(subject => {
      subject.totalMarks = subject.theoryMarks + subject.practicalMarks;
      totalObtained += subject.totalMarks;
      totalMax += (subject.maxTheory + subject.maxPractical);
    });

    this.totalObtained = totalObtained;
    this.totalMax = totalMax;
    this.percentage = parseFloat(((totalObtained / totalMax) * 100).toFixed(2));

    // Auto grade
    if (this.percentage >= 85) this.grade = 'A+';
    else if (this.percentage >= 75) this.grade = 'A';
    else if (this.percentage >= 65) this.grade = 'B+';
    else if (this.percentage >= 51) this.grade = 'B';
    else if (this.percentage >= 40) this.grade = 'C';
    else { 
      this.grade = 'F'; 
      this.result = 'FAIL'; 
    }

    if (this.grade !== 'F') this.result = 'PASS';
  }
  next();
});

const Student = mongoose.model("Student", studentSchema);

export default Student;