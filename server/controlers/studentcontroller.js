import Student from '../model/Certificate.js';
import { generatePDF, generateQRCode } from '../middleware/pdfGenerator.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// __dirname fix for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// POST /api/student/create
export const createStudent = async (req, res) => {
  try {
    const data = JSON.parse(req.body.studentData || '{}');

    if (req.file) {
      data.photoUrl = `/uploads/photos/${req.file.filename}`;
    }

    if (typeof data.subjects === 'string') {
      data.subjects = JSON.parse(data.subjects);
    }

    const existing = await Student.findOne({ registrationNumber: data.registrationNumber });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Registration number already exists' });
    }

    const student = new Student(data);
    await student.save();

    try {
      const pdfUrl = await generatePDF(student);
      student.pdfUrl = pdfUrl;

      const serverUrl = process.env.SERVER_URL || 'https://ddsgroup.onrender.com';
      student.qrCodeData = `${serverUrl}/verify/${student.registrationNumber}`;

      await student.save();
    } catch (pdfErr) {
      console.error('PDF generation error:', pdfErr.message);
    }

    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      data: student
    });
  } catch (err) {
    console.error('Create student error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/student/all
export const getAllStudents = async (req, res) => {
  try {
    const { search, course, page = 1, limit = 20 } = req.query;
    const query = { isActive: true };

    if (search) {
      query.$or = [
        { studentName: { $regex: search, $options: 'i' } },
        { registrationNumber: { $regex: search, $options: 'i' } },
        { rollNumber: { $regex: search, $options: 'i' } }
      ];
    }

    if (course) query.courseName = { $regex: course, $options: 'i' };

    const total = await Student.countDocuments(query);

    const students = await Student.find(query)
      .select('studentName fatherName registrationNumber rollNumber courseName grade result pdfUrl photoUrl createdAt percentage totalObtained totalMax')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({
      success: true,
      data: students,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/student/:id
export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }
    res.json({ success: true, data: student });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/student/search
export const searchStudent = async (req, res) => {
  try {
    const { registrationNumber, studentName, courseName } = req.query;

    if (!registrationNumber && !studentName && !courseName) {
      return res.status(400).json({
        success: false,
        message: 'Provide at least one search parameter'
      });
    }

    const query = { isActive: true };

    if (registrationNumber) query.registrationNumber = { $regex: registrationNumber, $options: 'i' };
    if (studentName) query.studentName = { $regex: studentName, $options: 'i' };
    if (courseName) query.courseName = { $regex: courseName, $options: 'i' };

    const students = await Student.find(query).limit(10);

    res.json({ success: true, data: students });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /api/student/update/:id
export const updateStudent = async (req, res) => {
  try {
    const data = JSON.parse(req.body.studentData || '{}');

    if (req.file) {
      data.photoUrl = `/uploads/photos/${req.file.filename}`;

      const old = await Student.findById(req.params.id);
      if (old && old.photoUrl) {
        const oldPath = path.join(__dirname, '..', old.photoUrl);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
    }

    if (typeof data.subjects === 'string') {
      data.subjects = JSON.parse(data.subjects);
    }

    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    Object.assign(student, data);
    await student.save();

    try {
      if (student.pdfUrl) {
        const oldPdfPath = path.join(__dirname, '..', student.pdfUrl);
        if (fs.existsSync(oldPdfPath)) fs.unlinkSync(oldPdfPath);
      }

      const pdfUrl = await generatePDF(student);
      student.pdfUrl = pdfUrl;
      await student.save();
    } catch (pdfErr) {
      console.error('PDF regeneration error:', pdfErr.message);
    }

    res.json({
      success: true,
      message: 'Student updated successfully',
      data: student
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE /api/student/delete/:id
export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    if (student.photoUrl) {
      const photoPath = path.join(__dirname, '..', student.photoUrl);
      if (fs.existsSync(photoPath)) fs.unlinkSync(photoPath);
    }

    if (student.pdfUrl) {
      const pdfPath = path.join(__dirname, '..', student.pdfUrl);
      if (fs.existsSync(pdfPath)) fs.unlinkSync(pdfPath);
    }

    await Student.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: 'Student deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/student/regenerate-pdf/:id
export const regeneratePDF = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    if (student.pdfUrl) {
      const oldPath = path.join(__dirname, '..', student.pdfUrl);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    const pdfUrl = await generatePDF(student);
    student.pdfUrl = pdfUrl;
    await student.save();

    res.json({
      success: true,
      message: 'PDF regenerated',
      data: { pdfUrl }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};