import express from "express";
import { generatePDF } from "../controlers/certificatecontroller.js";

const router = express.Router();

// route
router.get("/pdf/:id", generatePDF);

// export default
export default router;