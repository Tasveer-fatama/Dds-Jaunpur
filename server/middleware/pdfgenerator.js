import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
import path from 'path';
import fs from 'fs';
import QRCode from 'qrcode';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pdfsDir = path.join(__dirname, '../uploads/pdfs');
if (!fs.existsSync(pdfsDir)) {
  fs.mkdirSync(pdfsDir, { recursive: true });
}

const getGradeColor = (grade) => {
  const colors = { 'A+': '#1a7a1a', 'A': '#2563eb', 'B+': '#7c3aed', 'B': '#b45309', 'C': '#b45309', 'F': '#dc2626' };
  return colors[grade] || '#2563eb';
};

export const generateQRCode = async (registrationNumber, serverUrl) => {
  const verifyUrl = `${serverUrl}/verify/${registrationNumber}`;
  try { return await QRCode.toDataURL(verifyUrl, { width: 100, margin: 1 }); }
  catch { return ''; }
};

const getImageBase64 = (filePath) => {
  try {
    if (!filePath || !fs.existsSync(filePath)) return null;
    const ext = path.extname(filePath).toLowerCase().replace('.', '');
    const mimeType = ext === 'jpg' ? 'jpeg' : ext;
    const data = fs.readFileSync(filePath);
    return `data:image/${mimeType};base64,${data.toString('base64')}`;
  } catch { return null; }
};

const generateCertificateHTML = (
  student,
  qrCodeDataUrl,
  photoBase64,
  certificateBg
) => {
  return `
  <div style="
    width:210mm;
    height:297mm;
    position:relative;
    background-image:url('${certificateBg}');
    background-size:100% 100%;
    background-repeat:no-repeat;
    font-family:Arial, sans-serif;
  ">

    <!-- Student Name -->
    <div style="
      position:absolute;
      top:98mm;
      left:105mm;
      transform:translateX(-50%);
      width:120mm;
      text-align:center;
      font-size:9mm;
      font-weight:bold;
      text-transform:uppercase;
    ">
      ${student.studentName}
    </div>

    <!-- Day -->
    <div style="
      position:absolute;
      top:110mm;
      left:62mm;
      font-size:6mm;
      font-weight:bold;
    ">
      ${student.day || ''}
    </div>

    <!-- Month -->
    <div style="
      position:absolute;
      top:110mm;
      left:96mm;
      font-size:6mm;
      font-weight:bold;
    ">
      ${student.month || ''}
    </div>

    <!-- Year -->
    <div style="
      position:absolute;
      top:110mm;
      left:154mm;
      font-size:6mm;
      font-weight:bold;
    ">
      ${student.year || ''}
    </div>

    <!-- Course Name -->
    <div style="
      position:absolute;
      top:129mm;
      left:105mm;
      transform:translateX(-50%);
      width:180mm;
      text-align:center;
      font-size:7mm;
      font-weight:bold;
      text-transform:uppercase;
    ">
      ${student.courseName}
    </div>

    <!-- Session From -->
    <div style="
      position:absolute;
      top:157mm;
      left:83mm;
      transform:translateX(-50%);
      font-size:6mm;
      font-weight:bold;
    ">
      ${student.sessionFrom}
    </div>

    <!-- Session To -->
    <div style="
      position:absolute;
      top:157mm;
      left:138mm;
      transform:translateX(-50%);
      font-size:6mm;
      font-weight:bold;
    ">
      ${student.sessionTo}
    </div>

    <!-- Grade -->
    <div style="
      position:absolute;
      top:194mm;
      left:87mm;
      transform:translateX(-50%);
      font-size:7mm;
      font-weight:bold;
      color:#c62828;
    ">
      "${student.grade}"
    </div>

    <!-- Duration -->
    <div style="
      position:absolute;
      top:194mm;
      left:145mm;
      transform:translateX(-50%);
      font-size:7mm;
      font-weight:bold;
    ">
      ${student.duration}
    </div>

    ${
      photoBase64
        ? `
      <img
        src="${photoBase64}"
        style="
          position:absolute;
          top:47mm;
          right:18mm;
          width:24mm;
          height:30mm;
          object-fit:cover;
          border:1px solid #555;
        "
      />
    `
        : ''
    }

    ${
      qrCodeDataUrl
        ? `
      <img
        src="${qrCodeDataUrl}"
        style="
          position:absolute;
          bottom:8mm;
          right:18mm;
          width:22mm;
          height:22mm;
        "
      />
    `
        : ''
    }

  </div>
  `;
};

const generateMarksheetHTML = (
  student,
  qrCodeDataUrl,
  marksheetBg
) => {
  return `
  <div style="
    width:210mm;
    height:297mm;
    position:relative;
    background-image:url('${marksheetBg}');
    background-size:100% 100%;
    background-repeat:no-repeat;
    font-family: Arial, Helvetica, sans-serif;
  ">

    <!-- LEFT SIDE -->
    <div style="position:absolute;top:90mm;left:52mm;font-size:14px;font-weight:500;">
      ${student.studentName}
    </div>

    <div style="position:absolute;top:103mm;left:66mm;font-size:14px;">
      ${student.fatherName}
    </div>

    <div style="position:absolute;top:116mm;left:70mm;font-size:14px;">
      ${student.center || ''}
    </div>

    <div style="position:absolute;top:129mm;left:60mm;font-size:14px;">
      ${student.vlc || ''}
    </div>

    <!-- RIGHT SIDE -->
    <div style="position:absolute;top:90mm;left:150mm;font-size:14px;">
      ${student.courseName}
    </div>

    <div style="position:absolute;top:103mm;left:150mm;font-size:14px;">
      ${student.duration}
    </div>

    <div style="position:absolute;top:116mm;left:150mm;font-size:14px;">
      ${student.registrationNumber}
    </div>

    <div style="position:absolute;top:129mm;left:150mm;font-size:14px;">
      ${student.sessionFrom} to ${student.sessionTo}
    </div>

    <!-- SUBJECT TABLE -->
    ${
      (student.subjects || [])
        .map((subject, index) => {
          const top = 168 + index * 13;

          return `
          <!-- Subject Name -->
          <div style="position:absolute;top:${top}mm;left:45mm;font-size:13px;width:70mm;">
            ${subject.name}
          </div>

          <!-- Theory -->
          <div style="position:absolute;top:${top}mm;left:122mm;font-size:13px;text-align:center;width:15mm;">
            ${subject.theoryMarks}
          </div>

          <!-- Practical -->
          <div style="position:absolute;top:${top}mm;left:145mm;font-size:13px;text-align:center;width:15mm;">
            ${subject.practicalMarks}
          </div>

          <!-- Total -->
          <div style="position:absolute;top:${top}mm;left:175mm;font-size:13px;text-align:center;width:15mm;">
            ${Number(subject.theoryMarks) + Number(subject.practicalMarks)}
          </div>
          `;
        })
        .join("")
    }

    <!-- PASS GRADE -->
    <div style="
      position:absolute;
      top:220mm;
      left:75mm;
      font-size:16px;
      font-weight:bold;
      color:#c62828;
    ">
      "${student.grade}"
    </div>

    <!-- TOTAL MARKS -->
    <div style="
      position:absolute;
      top:220mm;
      left:170mm;
      font-size:18px;
      font-weight:bold;
    ">
      ${student.totalObtained}
    </div>

    <!-- DATE -->
    <div style="
      position:absolute;
      bottom:55mm;
      left:35mm;
      font-size:14px;
      font-weight:bold;
    ">
      ${student.issueDate}
    </div>

    ${
      qrCodeDataUrl
        ? `
        <img
          src="${qrCodeDataUrl}"
          style="
            position:absolute;
            bottom:30mm;
            right:20mm;
            width:22mm;
            height:22mm;
          "
        />
      `
        : ''
    }

  </div>
  `;
};

export const generatePDF = async (student) => {
  const serverUrl =
    process.env.SERVER_URL ||
    'https://ddsgroup.onrender.com';

  const qrCodeDataUrl = await generateQRCode(
    student.registrationNumber,
    serverUrl
  );

  let photoBase64 = null;

  if (student.photoUrl) {
    const photoPath = path.join(
      __dirname,
      '..',
      student.photoUrl.replace(/^\//, '')
    );

    photoBase64 = getImageBase64(photoPath);
  }

  // DDS Background Images
  const certificateBg = getImageBase64(
    path.join(__dirname, 'templates/ddscertificate.jpeg')
  );

  const marksheetBg = getImageBase64(
    path.join(__dirname, 'templates/ddsmarksheet.jpeg')
  );

  // Generate HTML
  const certificateHTML = generateCertificateHTML(
    student,
    qrCodeDataUrl,
    photoBase64,
    certificateBg
  );

  const marksheetHTML = generateMarksheetHTML(
    student,
    qrCodeDataUrl,
    marksheetBg
  );

  const fullHTML = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <style>
      *{
        margin:0;
        padding:0;
        box-sizing:border-box;
      }

      html,body{
        width:210mm;
        background:#fff;
      }

      @page{
        size:A4;
        margin:0;
      }

      body{
        font-family:'Times New Roman', serif;
      }
    </style>
  </head>

  <body>
    ${certificateHTML}
    ${marksheetHTML}
  </body>
  </html>
  `;

  const executablePath = await chromium.executablePath();

  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: {
      width: 1240,
      height: 1754,
      deviceScaleFactor: 2
    },
    executablePath,
    headless: chromium.headless,
  });

  try {
    const page = await browser.newPage();

    await page.setContent(fullHTML, {
      waitUntil: 'networkidle0'
    });

    const pdfFilename =
      `certificate-${student.registrationNumber}-${Date.now()}.pdf`;

    const pdfPath = path.join(
      pdfsDir,
      pdfFilename
    );

    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      margin: {
        top: '0mm',
        right: '0mm',
        bottom: '0mm',
        left: '0mm'
      }
    });

    return `/uploads/pdfs/${pdfFilename}`;

  } finally {
    await browser.close();
  }
};