import express from "express";
import Student from "../model/Certificate.js";
import generatePDF from "../utils/pdfGenerator.js";

const router = express.Router();

// Create Student + PDF
router.post("/create", async (req, res) => {
  try {
    const pdfPath = await generatePDF(req.body);

    const student = new Student({
      ...req.body,
      pdfUrl: pdfPath
    });

    await student.save();

    res.json(student);
  } catch (error) {
    res.status(500).json({ message: "create error", error: error.message });
  }
});

// Search Student
router.get("/search", async (req, res) => {
  try {
    const { name, regNo } = req.query;

    const student = await Student.findOne({ name, regNo });

    if (!student) return res.status(404).json({ message: "Not found" });

    res.json(student);
  } catch (error) {
    res.status(500).json({ message: "search error", error: error.message });
  }
});

export default router;