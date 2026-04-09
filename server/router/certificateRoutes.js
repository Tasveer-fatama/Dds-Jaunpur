import express from "express";

import {
  createCertificate,
  getCertificate,
  generatePDF,
  getPDF   // ✅ NEW
} from "../controlers/certificatecontroller.js";

import { upload } from "../middleware/upload.js";

const router = express.Router();

// ✅ CREATE DATA
router.post(
  "/create",
  upload.single("photo"), 
  createCertificate
);

// ✅ SEARCH (student side)
router.get("/search", getCertificate);

// ✅ GENERATE PDF (admin use only)
router.get("/generate/:id", generatePDF);

// ✅ SERVE PDF (student download/view)
router.get("/pdf/:file", getPDF);

export default router;