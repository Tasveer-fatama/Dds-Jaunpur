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
    overflow:hidden;
  ">

    <!-- Student Name -->
    <div style="
      position:absolute;
      top:105mm;
      left:50%;
      transform:translateX(-50%);
      width:150mm;
      text-align:center;
      font-size:8mm;
      font-weight:bold;
      text-transform:uppercase;
      white-space:nowrap;
    ">
      ${student.studentName}
    </div>

   <!-- Date of Issue: name ke neeche wali line pe -->
    <div style="
      position:absolute;
      top:122mm;
      left:50%;
      transform:translateX(-50%);
      width:150mm;
      text-align:center;
      font-size:5.5mm;
      font-weight:bold;
    ">
      ${student.issueDate}
    </div>

    <!-- Course Name -->
    <div style="
      position:absolute;
      top:144mm;
      left:50%;
      transform:translateX(-50%);
      width:190mm;
      text-align:center;
      font-size:6.5mm;
      font-weight:bold;
      text-transform:uppercase;
      white-space:nowrap;
    ">
      ${student.courseName}
    </div>

    <!-- Session From -->
    <div style="
      position:absolute;
      top:162mm;
      left:62mm;
      transform:translateX(-50%);
      font-size:5.5mm;
      font-weight:bold;
      text-align:center;
      white-space:nowrap;
    ">
      ${student.sessionFrom}
    </div>

    <!-- Session To -->
    <div style="
      position:absolute;
      top:162mm;
      left:148mm;
      transform:translateX(-50%);
      font-size:5.5mm;
      font-weight:bold;
      text-align:center;
      white-space:nowrap;
    ">
      ${student.sessionTo}
    </div>

    <!-- Grade -->
    <div style="
      position:absolute;
      top:192mm;
      left:82mm;
      transform:translateX(-50%);
      font-size:6.5mm;
      font-weight:bold;
      color:#c62828;
      text-align:center;
      white-space:nowrap;
    ">
      &quot;${student.grade}&quot;
    </div>

    <!-- Duration -->
    <div style="
      position:absolute;
      top:192mm;
      left:152mm;
      transform:translateX(-50%);
      font-size:6.5mm;
      font-weight:bold;
      text-align:center;
      white-space:nowrap;
    ">
      ${student.duration}
    </div>

    <!-- Photo -->
    ${
      photoBase64
        ? `
      <img
        src="${photoBase64}"
        style="
          position:absolute;
          top:43mm;
          right:12mm;
          width:25mm;
          height:31mm;
          object-fit:cover;
          border:1px solid #555;
        "
      />
    `
        : ''
    }

    <!-- QR Code -->
    ${
      qrCodeDataUrl
        ? `
      <img
        src="${qrCodeDataUrl}"
        style="
          position:absolute;
          bottom:8mm;
          right:16mm;
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

const generateMarksheetHTML = (student, qrCodeDataUrl, marksheetBg) => {
  return `
  <div style="width:794px;height:1123px;position:relative;
    background:url('${marksheetBg}') no-repeat center top;
    background-size:794px 1123px;
    font-family:'Times New Roman', serif;">

    <!-- LEFT SIDE -->
    <div style="position:absolute;top:306px;left:162px;font-size:13px;font-weight:bold;white-space:nowrap;">
      ${student.studentName}</div>

    <div style="position:absolute;top:343px;left:162px;font-size:13px;white-space:nowrap;">
      ${student.fatherName}</div>

    <div style="position:absolute;top:379px;left:162px;font-size:12px;white-space:nowrap;">
      ${student.center || ''}</div>

    <div style="position:absolute;top:415px;left:162px;font-size:12px;white-space:nowrap;">
      ${student.vlc || ''}</div>

    <!-- RIGHT SIDE -->
    <div style="position:absolute;top:306px;left:629px;font-size:12px;white-space:nowrap;">
      ${student.courseName}</div>

    <div style="position:absolute;top:343px;left:629px;font-size:12px;white-space:nowrap;">
      ${student.duration}</div>

    <div style="position:absolute;top:379px;left:629px;font-size:12px;white-space:nowrap;">
      ${student.registrationNumber}</div>

    <div style="position:absolute;top:415px;left:629px;font-size:12px;white-space:nowrap;">
      ${student.sessionFrom} to ${student.sessionTo}</div>

    <!-- SUBJECT ROWS: Sr.No 1=577, 2=613, 3=648, 4=684 -->
    ${(student.subjects || []).map((sub, i) => {
      const tops = [577, 613, 648, 684];
      const top = tops[i] ?? (577 + i * 36);
      const total = Number(sub.theoryMarks) + Number(sub.practicalMarks);
      return `
        <div style="position:absolute;top:${top}px;left:137px;
          font-size:12px;width:255px;overflow:hidden;white-space:nowrap;">
          ${sub.name}</div>
        <div style="position:absolute;top:${top}px;left:437px;
          width:52px;text-align:center;font-size:12px;">
          ${sub.theoryMarks}</div>
        <div style="position:absolute;top:${top}px;left:548px;
          width:52px;text-align:center;font-size:12px;">
          ${sub.practicalMarks}</div>
        <div style="position:absolute;top:${top}px;left:644px;
          width:55px;text-align:center;font-size:12px;">
          ${total}</div>
      `;
    }).join('')}

    <!-- PASS IN GRADE box -->
    <div style="position:absolute;top:756px;left:237px;
      font-size:14px;font-weight:bold;text-align:center;width:84px;">
      ${student.grade}</div>

    <!-- Total Marks box -->
    <div style="position:absolute;top:756px;left:626px;
      font-size:14px;font-weight:bold;text-align:center;width:72px;">
      ${student.totalObtained}</div>

    <!-- Issue Date -->
    <div style="position:absolute;top:883px;left:104px;font-size:12px;">
      ${student.issueDate}</div>

    <!-- QR Code -->
    ${qrCodeDataUrl ? `
      <img src="${qrCodeDataUrl}"
        style="position:absolute;top:840px;left:651px;
        width:96px;height:96px;" />
    ` : ''}

  </div>`;
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