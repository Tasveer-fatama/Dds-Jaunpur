import Student from '../model/Certificate.js';
import { generatePDF, generateQRCode } from '../middleware/pdfgenerator.js';
import { uploadBufferToCloudinary, deleteFromCloudinary } from '../utils/cloudinaryUpload.js';

// POST /api/student/create
export const createStudent = async (req, res) => {
  try {
    const data = JSON.parse(req.body.studentData || '{}');

    // Photo Cloudinary pe upload karo
    if (req.file) {
      const uploadResult = await uploadBufferToCloudinary(req.file.buffer, {
        folder: 'dds-certificates/photos',
        public_id: `photo-${data.registrationNumber}`,
        resource_type: 'image',
      });
      data.photoUrl = uploadResult.secure_url;
      data.photoPublicId = uploadResult.public_id;
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

    // PDF + QR generate karo
    try {
      // QR code
      student.qrCodeData = await generateQRCode(student.registrationNumber);

      // PDF generate karke Cloudinary pe upload
      const { pdfUrl, pdfPublicId } = await generatePDF(student);
      student.pdfUrl = pdfUrl;
      student.pdfPublicId = pdfPublicId;

      await student.save();
    } catch (pdfErr) {
      console.error('PDF/QR generation error:', pdfErr.message);
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

    // Pehle student fetch karo — old public_ids chahiye delete ke liye
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    // Naya photo upload hua hai toh purana Cloudinary se delete karo
    if (req.file) {
      if (student.photoPublicId) {
        await deleteFromCloudinary(student.photoPublicId, 'image');
      }

      const uploadResult = await uploadBufferToCloudinary(req.file.buffer, {
        folder: 'dds-certificates/photos',
        public_id: `photo-${student.registrationNumber}`,
        resource_type: 'image',
      });
      data.photoUrl = uploadResult.secure_url;
      data.photoPublicId = uploadResult.public_id;
    }

    if (typeof data.subjects === 'string') {
      data.subjects = JSON.parse(data.subjects);
    }

    // Old PDF public_id save karo delete ke liye
    const oldPdfPublicId = student.pdfPublicId || null;

    Object.assign(student, data);
    await student.save();

    // PDF regenerate karo — purana delete, naya upload
    try {
      if (oldPdfPublicId) {
        await deleteFromCloudinary(oldPdfPublicId, 'raw');
      }

      const { pdfUrl, pdfPublicId } = await generatePDF(student);
      student.pdfUrl = pdfUrl;
      student.pdfPublicId = pdfPublicId;
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

    // Cloudinary se photo aur PDF dono delete karo
    if (student.photoPublicId) await deleteFromCloudinary(student.photoPublicId, 'image');
    if (student.pdfPublicId) await deleteFromCloudinary(student.pdfPublicId, 'raw');

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

    // Purana PDF Cloudinary se delete karo
    if (student.pdfPublicId) {
      await deleteFromCloudinary(student.pdfPublicId, 'raw');
    }

    // Naya PDF generate karke upload karo
    const { pdfUrl, pdfPublicId } = await generatePDF(student);
    student.pdfUrl = pdfUrl;
    student.pdfPublicId = pdfPublicId;
    await student.save();

    res.json({
      success: true,
      message: 'PDF regenerated successfully',
      data: { pdfUrl }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};