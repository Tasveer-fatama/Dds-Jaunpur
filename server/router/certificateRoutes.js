import express from "express";

import {
 createCertificate,
 getCertificate,
 generatePDF
} from "../controlers/certificatecontroller.js";

import { upload } from "../middleware/upload.js";

const router = express.Router();

// create certificate
router.post(
 "/create",
 upload.single("photo"),
 createCertificate
);

// search certificate
router.get(
 "/get",
 getCertificate
);

// generate pdf
router.get(
 "/pdf/:id",
 generatePDF
);

export default router;