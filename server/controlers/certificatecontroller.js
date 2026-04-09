import Certificate from "../model/Certificate.js"

import puppeteer from "puppeteer-core"

import chromium from "@sparticuz/chromium"
import fs from "fs";
import path from "path"



// CREATE DATA

export const createCertificate = async (req, res) => {
  try {
    let subjects = [];

    if (req.body.subjects) {
      try {
        subjects = JSON.parse(req.body.subjects);
      } catch {
        subjects = [];
      }
    }

    const cert = await Certificate.create({
      ...req.body,
      subjects,
      photo: req.file ? req.file.filename : "",
    });

    res.status(201).json(cert);
  } catch (err) {
    res.status(500).json({
      message: "create error",
      error: err.message,
    });
  }
};



// SEARCH BY ROLL + DOB

export const getCertificate = async (req, res) => {
  try {
    const { name, rollNumber, dob } = req.query;

    const cert = await Certificate.findOne({
      name,
      rollNumber,
      dob,
    });

    if (!cert) {
      return res.status(404).json({
        message: "not found",
      });
    }

    res.json({
      pdfUrl: `${process.env.BASE_URL}/uploads/${cert.pdf}`,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};


// GENERATE PDF (2 page only)

export const generatePDF = async (req, res) => {
  try {
    const cert = await Certificate.findById(req.params.id);

    if (!cert) {
      return res.status(404).json({ message: "not found" });
    }

    const baseURL =
      process.env.BASE_URL || "https://ddsgroup.onrender.com";

    const photoURL = cert.photo
      ? `${baseURL}/uploads/${cert.photo}`
      : "";

    // 🔥 UNIQUE FILE NAME
    const fileName = `${cert.rollNumber}-${Date.now()}.pdf`;
    const filePath = path.join("uploads", fileName);

    const html = `
    <html>
    <head>
    <style>
      body { font-family: Arial; margin:0; }

      .page {
        width:100%;
        height:100vh;
        padding:40px;
        box-sizing:border-box;
        page-break-after:always;
        position:relative;
      }

      .header {
        text-align:center;
        font-size:42px;
        font-weight:bold;
        color:#991b1b;
      }

      .title {
        text-align:center;
        font-size:28px;
        margin-top:10px;
        color:#b91c1c;
      }

      .photo {
        position:absolute;
        right:60px;
        top:150px;
        width:120px;
        height:140px;
        border:1px solid black;
      }

      .text {
        margin-top:50px;
        font-size:18px;
        line-height:30px;
        text-align:center;
      }

      table {
        width:100%;
        border-collapse:collapse;
        margin-top:30px;
      }

      th,td {
        border:1px solid black;
        padding:8px;
      }

      .footer {
        position:absolute;
        bottom:20px;
        width:100%;
        text-align:center;
      }
    </style>
    </head>

    <body>

    <!-- PAGE 1 -->
    <div class="page">

      <div class="header">DDS</div>
      <div class="title">Certificate</div>

      ${
        photoURL
          ? `<img src="${photoURL}" class="photo" />`
          : ""
      }

      <div class="text">
        This Certificate is awarded to <br/><br/>
        <h2>${cert.name}</h2>
        S/O ${cert.fatherName} <br/><br/>

        has successfully completed <br/>
        <b>${cert.course}</b><br/><br/>

        Duration: ${cert.duration} <br/>
        From: ${cert.startDate} To: ${cert.endDate} <br/><br/>

        Grade: <b>${cert.grade}</b><br/>
        Issue Date: ${cert.issueDate}
      </div>

      <div class="footer">DDS Group</div>

    </div>

    <!-- PAGE 2 -->
    <div class="page">

      <h2 style="text-align:center">Statement of Marks</h2>

      <table>
        <tr>
          <th>Subject</th>
          <th>Theory</th>
          <th>Practical</th>
          <th>Total</th>
        </tr>

        ${cert.subjects
          .map(
            (s) => `
          <tr>
            <td>${s.name}</td>
            <td>${s.theory}</td>
            <td>${s.practical}</td>
            <td>${s.total}</td>
          </tr>
        `
          )
          .join("")}
      </table>

      <h3>Total Marks: ${cert.totalMarks}</h3>
      <h3>Grade: ${cert.grade}</h3>

      <div class="footer">DDS Group</div>

    </div>

    </body>
    </html>
    `;

    const browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });

    const page = await browser.newPage();

    await page.setContent(html, {
      waitUntil: "networkidle0",
    });

    await page.pdf({
      path: filePath,
      format: "A4",
      printBackground: true,
    });

    await browser.close();

    cert.pdf = fileName;
    await cert.save();

    res.json({
      message: "PDF generated",
      pdfUrl: `${baseURL}/uploads/${fileName}`,
    });
  } catch (err) {
    res.status(500).json({
      message: "pdf error",
      error: err.message,
    });
  }
};

export const getPDF = (req, res) => {
  const filePath = path.join("uploads", req.params.file);

  if (!fs.existsSync(filePath)) {
    return res.status(404).send("PDF not found");
  }

  res.sendFile(path.resolve(filePath));
};