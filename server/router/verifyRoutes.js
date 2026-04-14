import express from 'express';
import Student from '../model/Certificate.js';

const router = express.Router();

// GET /verify/:registrationNumber
router.get('/:registrationNumber', async (req, res) => {
  try {
    const student = await Student.findOne({
      registrationNumber: req.params.registrationNumber,
      isActive: true
    }).select(
      'studentName fatherName registrationNumber rollNumber courseName grade result percentage totalObtained totalMax sessionFrom sessionTo issueDate duration'
    );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Certificate not found or invalid'
      });
    }

    // Browser request → redirect to frontend
    if (req.headers.accept?.includes('text/html')) {
      const clientUrl = process.env.CLIENT_URL || 'https://www.ddsgroupofinstitution.com';
      return res.redirect(`${clientUrl}/verify/${student.registrationNumber}`);
    }

    // API response
    return res.json({
      success: true,
      message: 'Certificate verified successfully',
      data: {
        studentName: student.studentName,
        fatherName: student.fatherName,
        registrationNumber: student.registrationNumber,
        rollNumber: student.rollNumber,
        courseName: student.courseName,
        grade: student.grade,
        result: student.result,
        percentage: student.percentage,
        totalObtained: student.totalObtained,
        totalMax: student.totalMax,
        session: `${student.sessionFrom} to ${student.sessionTo}`,
        issueDate: student.issueDate,
        duration: student.duration,
        verifiedAt: new Date().toISOString()
      }
    });

  } catch (err) {
    console.error('Verify error:', err);
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

export default router;