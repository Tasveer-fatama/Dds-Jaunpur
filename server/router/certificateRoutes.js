import express from "express";

import {

 createCertificate,

 getCertificate,

 generatePDF

}

from "../controlers/certificatecontroller.js";


import { upload } from "../middleware/upload.js";


const router = express.Router();



// CREATE CERTIFICATE DATA

router.post(

"/create",

upload.single("photo"),

createCertificate

);



// SEARCH BY ROLL NUMBER + DOB

router.get(

"/search",

getCertificate

);



// GENERATE PDF

router.get(

"/pdf/:id",

generatePDF

);



export default router;