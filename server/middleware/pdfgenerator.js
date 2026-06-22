import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
import QRCode from 'qrcode';
import { uploadBufferToCloudinary } from '../utils/cloudinaryUpload.js';
import fetch from 'node-fetch';

// QR Code generate karo — registration number se URL banta hai
export const generateQRCode = async (registrationNumber) => {
  const verifyUrl = `https://www.ddsgroupofinstitution.com/Getintouch/${registrationNumber}`;
  try {
    return await QRCode.toDataURL(verifyUrl, { width: 100, margin: 1 });
  } catch {
    return '';
  }
};

// Cloudinary URL se image fetch karke base64 banao
const getImageBase64FromUrl = async (url) => {
  try {
    if (!url) return null;
    const res = await fetch(url);
    if (!res.ok) return null;
    const buffer = await res.buffer();
    const contentType = res.headers.get('content-type') || 'image/jpeg';
    return `data:${contentType};base64,${buffer.toString('base64')}`;
  } catch {
    return null;
  }
};

// Template images — local se base64 (build time pe available hoti hain)
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getLocalImageBase64 = (filePath) => {
  try {
    if (!filePath || !fs.existsSync(filePath)) return null;
    const ext = path.extname(filePath).toLowerCase().replace('.', '');
    const mimeType = ext === 'jpg' ? 'jpeg' : ext;
    const data = fs.readFileSync(filePath);
    return `data:image/${mimeType};base64,${data.toString('base64')}`;
  } catch {
    return null;
  }
};

const generateCertificateHTML = (student, qrCodeDataUrl, photoBase64, certificateBg) => {
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
      position:absolute;top:105mm;left:50%;
      transform:translateX(-50%);width:150mm;
      text-align:center;font-size:8mm;font-weight:bold;
      text-transform:uppercase;white-space:nowrap;">
      ${student.studentName}
    </div>

    <!-- Date of Issue -->
    <div style="
      position:absolute;top:122mm;left:50%;
      transform:translateX(-50%);width:150mm;
      text-align:center;font-size:5.5mm;font-weight:bold;">
      ${student.issueDate}
    </div>

    <!-- Course Name -->
    <div style="
      position:absolute;top:144mm;left:50%;
      transform:translateX(-50%);width:190mm;
      text-align:center;font-size:6.5mm;font-weight:bold;
      text-transform:uppercase;white-space:nowrap;">
      ${student.courseName}
    </div>

    <!-- Session From -->
    <div style="
      position:absolute;top:162mm;left:62mm;
      transform:translateX(-50%);font-size:5.5mm;
      font-weight:bold;text-align:center;white-space:nowrap;">
      ${student.sessionFrom}
    </div>

    <!-- Session To -->
    <div style="
      position:absolute;top:162mm;left:148mm;
      transform:translateX(-50%);font-size:5.5mm;
      font-weight:bold;text-align:center;white-space:nowrap;">
      ${student.sessionTo}
    </div>

    <!-- Grade -->
    <div style="
      position:absolute;top:192mm;left:82mm;
      transform:translateX(-50%);font-size:6.5mm;
      font-weight:bold;color:#c62828;
      text-align:center;white-space:nowrap;">
      &quot;${student.grade}&quot;
    </div>

    <!-- Duration -->
    <div style="
      position:absolute;top:192mm;left:152mm;
      transform:translateX(-50%);font-size:6.5mm;
      font-weight:bold;text-align:center;white-space:nowrap;">
      ${student.duration}
    </div>

    <!-- Photo -->
    ${photoBase64 ? `
      <img src="${photoBase64}" style="
        position:absolute;top:43mm;right:12mm;
        width:25mm;height:31mm;
        object-fit:cover;border:1px solid #555;" />
    ` : ''}

    <!-- QR Code -->
    ${qrCodeDataUrl ? `
      <img src="${qrCodeDataUrl}" style="
        position:absolute;bottom:8mm;right:16mm;
        width:22mm;height:22mm;" />
    ` : ''}
  </div>`;
};

const generateMarksheetHTML = (student, qrCodeDataUrl, marksheetBg) => {
  return `
  <div style="width:794px;height:1123px;position:relative;
    background:url('${marksheetBg}') no-repeat center top;
    background-size:794px 1123px;
    font-family:'Times New Roman', serif;">

    <div style="position:absolute;top:305px;left:262px;font-size:13px;font-weight:bold;white-space:nowrap;">
      ${student.studentName}</div>

    <div style="position:absolute;top:349px;left:262px;font-size:13px;white-space:nowrap;">
      ${student.fatherName}</div>

    <div style="position:absolute;top:393px;left:262px;font-size:12px;white-space:nowrap;">
      ${student.centerOfExamination || ''}</div>

    <div style="position:absolute;top:438px;left:262px;font-size:12px;white-space:nowrap;">
      ${student.ivetVlcsCode || ''}</div>

    <div style="position:absolute;top:305px;left:580px;font-size:12px;white-space:nowrap;">
      ${student.courseName}</div>

    <div style="position:absolute;top:349px;left:580px;font-size:12px;white-space:nowrap;">
      ${student.duration}</div>

    <div style="position:absolute;top:393px;left:580px;font-size:12px;white-space:nowrap;max-width:145px;overflow:hidden;">
      ${student.registrationNumber}</div>

    <div style="position:absolute;top:438px;left:580px;font-size:12px;white-space:nowrap;">
      ${student.sessionFrom} to ${student.sessionTo}</div>

    ${(student.subjects || []).map((sub, i) => {
      const tops = [547, 593, 637, 681];
      const top = tops[i] ?? (547 + i * 44);
      const total = Number(sub.theoryMarks) + Number(sub.practicalMarks);
      return `
        <div style="position:absolute;top:${top}px;left:150px;
          font-size:12px;width:270px;overflow:hidden;white-space:nowrap;">
          ${sub.name}</div>
        <div style="position:absolute;top:${top}px;left:450px;
          width:50px;text-align:center;font-size:12px;">
          ${sub.theoryMarks}</div>
        <div style="position:absolute;top:${top}px;left:562px;
          width:50px;text-align:center;font-size:12px;">
          ${sub.practicalMarks}</div>
        <div style="position:absolute;top:${top}px;left:666px;
          width:55px;text-align:center;font-size:12px;">
          ${total}</div>
      `;
    }).join('')}

    <div style="position:absolute;top:768px;left:193px;
      width:100px;height:26px;font-size:13px;font-weight:bold;
      display:flex;align-items:center;justify-content:center;">
      ${student.grade}</div>

    <div style="position:absolute;top:768px;left:648px;
      width:82px;height:26px;font-size:13px;font-weight:bold;
      display:flex;align-items:center;justify-content:center;">
      ${student.totalObtained}</div>

    <div style="position:absolute;top:911px;left:80px;font-size:12px;font-weight:bold;">
      ${student.issueDate}</div>

    ${qrCodeDataUrl ? `
      <img src="${qrCodeDataUrl}"
        style="position:absolute;top:875px;left:700px;width:62px;height:62px;" />
    ` : ''}
  </div>`;
};

// Main PDF generator — Cloudinary URL return karta hai
export const generatePDF = async (student) => {
  // QR code generate karo
  const qrCodeDataUrl = await generateQRCode(student.registrationNumber);

  // Photo: Cloudinary URL se fetch karke base64 banao
  let photoBase64 = null;
  if (student.photoUrl) {
    photoBase64 = await getImageBase64FromUrl(student.photoUrl);
  }

  // Background templates: local files se
  const certificateBg = getLocalImageBase64(path.join(__dirname, 'templates/ddscertificate.jpeg'));
  const marksheetBg = getLocalImageBase64(path.join(__dirname, 'templates/ddsmarksheet.jpeg'));

  const certificateHTML = generateCertificateHTML(student, qrCodeDataUrl, photoBase64, certificateBg);
  const marksheetHTML = generateMarksheetHTML(student, qrCodeDataUrl, marksheetBg);

  const fullHTML = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <style>
      * { margin:0; padding:0; box-sizing:border-box; }
      html, body { width:210mm; background:#fff; }
      @page { size:A4; margin:0; }
      body { font-family:'Times New Roman', serif; }
    </style>
  </head>
  <body>
    ${certificateHTML}
    ${marksheetHTML}
  </body>
  </html>`;

  const executablePath = await chromium.executablePath();
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: { width: 1240, height: 1754, deviceScaleFactor: 2 },
    executablePath,
    headless: chromium.headless,
  });

  let pdfBuffer;
  try {
    const page = await browser.newPage();
    await page.setContent(fullHTML, { waitUntil: 'networkidle0' });
    pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: '0mm', right: '0mm', bottom: '0mm', left: '0mm' }
    });
  } finally {
    await browser.close();
  }

  // Cloudinary pe upload karo
  const uploadResult = await uploadBufferToCloudinary(pdfBuffer, {
    folder: 'dds-certificates/pdfs',
    public_id: `certificate-${student.registrationNumber}`,
    format: 'pdf',
    resource_type: 'raw',
  });

  return {
    pdfUrl: uploadResult.secure_url,
    pdfPublicId: uploadResult.public_id,
  };
};