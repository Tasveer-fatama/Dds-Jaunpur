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

const generateCertificateHTML = (student, qrCodeDataUrl, photoBase64, serverUrl) => {
  const gradeColor = getGradeColor(student.grade);
  return `
  <div style="width:210mm; min-height:297mm; padding:12mm; font-family:'Times New Roman',serif; background:#fff; position:relative; page-break-after:always; box-sizing:border-box;">
    <div style="position:absolute; top:6mm; left:6mm; right:6mm; bottom:6mm; border:3px double #8B0000; pointer-events:none;"></div>
    <div style="position:absolute; top:8mm; left:8mm; right:8mm; bottom:8mm; border:1px solid #8B0000; pointer-events:none;"></div>
    <div style="text-align:center; margin-bottom:6mm;">
      <div style="font-size:11pt; color:#8B0000; font-weight:bold; letter-spacing:2px;">DDS GROUP OF INSTITUTION</div>
      <div style="font-size:8pt; color:#555; margin:2px 0;">Affiliated to IIVET | VLCS Code: ${student.ivetVlcsCode || 'IIVET-070/IVNE'}</div>
      <div style="width:100%; height:2px; background:linear-gradient(to right,#8B0000,#FFD700,#8B0000); margin:4mm 0;"></div>
      <div style="font-size:22pt; font-weight:bold; color:#8B0000; letter-spacing:4px; font-variant:small-caps;">Certificate of Completion</div>
      <div style="font-size:9pt; color:#555; margin-top:2mm; letter-spacing:1px;">This is to certify that</div>
    </div>
    <div style="text-align:center; margin:4mm 0;">
      <div style="font-size:20pt; font-weight:bold; color:#1a1a1a; border-bottom:2px solid #8B0000; display:inline-block; padding:0 8mm 2mm;">${student.studentName}</div>
    </div>
    <div style="float:right; margin:0 8mm 4mm 4mm; text-align:center;">
      ${photoBase64
        ? `<img src="${photoBase64}" style="width:28mm; height:33mm; object-fit:cover; border:2px solid #8B0000;" />`
        : `<div style="width:28mm; height:33mm; border:2px dashed #8B0000; display:flex; align-items:center; justify-content:center; color:#aaa; font-size:7pt;">Photo</div>`
      }
    </div>
    <div style="font-size:10.5pt; color:#222; line-height:1.9; margin:4mm 0; text-align:justify;">
      <p>Son / Daughter of <strong>${student.fatherName}</strong> and <strong>${student.motherName}</strong> has successfully completed the course of</p>
      <p style="text-align:center; font-size:13pt; font-weight:bold; color:#8B0000; margin:3mm 0;">${student.courseName}${student.courseCode ? ` (${student.courseCode})` : ''}</p>
      <p>from <strong>DDS Group of Institution</strong>, Center of Examination: <strong>${student.centerOfExamination || 'Main Center'}</strong>, during the session from <strong>${student.sessionFrom}</strong> to <strong>${student.sessionTo}</strong> with the duration of <strong>${student.duration || 'N/A'}</strong>.</p>
      <p style="margin-top:3mm;">The candidate has been awarded the grade of
        <strong style="color:${gradeColor}; font-size:13pt;"> ${student.grade} </strong>
        with <strong>${student.percentage}%</strong> marks and the result is declared as
        <strong style="color:${student.result === 'PASS' ? '#1a7a1a' : '#dc2626'};">${student.result}</strong>.
      </p>
    </div>
    <table style="width:100%; border-collapse:collapse; margin:5mm 0; font-size:9pt; clear:both;">
      <tr>
        <td style="padding:3px 6px; color:#555; width:40%;">Registration Number</td>
        <td style="padding:3px 6px; font-weight:bold;">: ${student.registrationNumber}</td>
        <td style="padding:3px 6px; color:#555; width:25%;">Roll Number</td>
        <td style="padding:3px 6px; font-weight:bold;">: ${student.rollNumber}</td>
      </tr>
      <tr>
        <td style="padding:3px 6px; color:#555;">Issue Date</td>
        <td style="padding:3px 6px; font-weight:bold;">: ${student.issueDate}</td>
        <td style="padding:3px 6px; color:#555;">VLCS Code</td>
        <td style="padding:3px 6px; font-weight:bold;">: ${student.ivetVlcsCode || 'IIVET-070/IVNE'}</td>
      </tr>
    </table>
    <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-top:12mm;">
      <div style="text-align:center;">
        <div style="width:50mm; border-top:1px solid #333; padding-top:3px; font-size:8pt; color:#555;">Student Signature</div>
      </div>
      <div style="text-align:center;">
        ${qrCodeDataUrl ? `<img src="${qrCodeDataUrl}" style="width:20mm; height:20mm;" /><br/><span style="font-size:6pt; color:#888;">Scan to Verify</span>` : ''}
      </div>
      <div style="text-align:center;">
        <div style="width:50mm; border-top:1px solid #333; padding-top:3px; font-size:8pt; color:#555;">Authorized Signatory</div>
      </div>
    </div>
    <div style="text-align:center; margin-top:6mm; font-size:7pt; color:#888; border-top:1px solid #ddd; padding-top:3mm;">
      This certificate is computer generated. Verify at: ${serverUrl}/verify/${student.registrationNumber}
    </div>
  </div>`;
};

const generateMarksheetHTML = (student, qrCodeDataUrl, serverUrl) => {
  const gradeColor = getGradeColor(student.grade);
  const subjectRows = (student.subjects || []).map((s, i) => {
    const total = (Number(s.theoryMarks) || 0) + (Number(s.practicalMarks) || 0);
    const maxTotal = (Number(s.maxTheory) || 0) + (Number(s.maxPractical) || 0);
    const subPct = maxTotal > 0 ? ((total / maxTotal) * 100).toFixed(0) : 0;
    return `
    <tr style="background:${i % 2 === 0 ? '#fafafa' : '#fff'};">
      <td style="padding:5px 8px; border:1px solid #ddd; text-align:center; font-size:9pt;">${i + 1}</td>
      <td style="padding:5px 8px; border:1px solid #ddd; font-size:9pt;">${s.name}</td>
      <td style="padding:5px 8px; border:1px solid #ddd; text-align:center; font-size:9pt;">${s.maxTheory}</td>
      <td style="padding:5px 8px; border:1px solid #ddd; text-align:center; font-size:9pt; font-weight:bold;">${s.theoryMarks}</td>
      <td style="padding:5px 8px; border:1px solid #ddd; text-align:center; font-size:9pt;">${s.maxPractical}</td>
      <td style="padding:5px 8px; border:1px solid #ddd; text-align:center; font-size:9pt; font-weight:bold;">${s.practicalMarks}</td>
      <td style="padding:5px 8px; border:1px solid #ddd; text-align:center; font-size:9pt;">${maxTotal}</td>
      <td style="padding:5px 8px; border:1px solid #ddd; text-align:center; font-size:9pt; font-weight:bold; color:#1a4a9a;">${total}</td>
      <td style="padding:5px 8px; border:1px solid #ddd; text-align:center; font-size:9pt;">${subPct}%</td>
    </tr>`;
  }).join('');

  return `
  <div style="width:210mm; min-height:297mm; padding:12mm; font-family:'Times New Roman',serif; background:#fff; position:relative; box-sizing:border-box;">
    <div style="position:absolute; top:6mm; left:6mm; right:6mm; bottom:6mm; border:3px double #1a3a6a; pointer-events:none;"></div>
    <div style="position:absolute; top:8mm; left:8mm; right:8mm; bottom:8mm; border:1px solid #1a3a6a; pointer-events:none;"></div>
    <div style="text-align:center; margin-bottom:5mm;">
      <div style="font-size:11pt; color:#1a3a6a; font-weight:bold; letter-spacing:2px;">DDS GROUP OF INSTITUTION</div>
      <div style="font-size:8pt; color:#555;">Affiliated to IIVET | VLCS Code: ${student.ivetVlcsCode || 'IIVET-070/IVNE'}</div>
      <div style="width:100%; height:2px; background:linear-gradient(to right,#1a3a6a,#FFD700,#1a3a6a); margin:3mm 0;"></div>
      <div style="font-size:18pt; font-weight:bold; color:#1a3a6a; letter-spacing:3px; font-variant:small-caps;">Statement of Marks</div>
    </div>
    <table style="width:100%; border-collapse:collapse; margin-bottom:5mm; font-size:9pt;">
      <tr><td style="padding:3px 0; color:#555; width:35%;">Student Name</td><td style="padding:3px 0; font-weight:bold;">: <strong>${student.studentName}</strong></td></tr>
      <tr><td style="padding:3px 0; color:#555;">Father's / Husband's Name</td><td style="padding:3px 0;">: ${student.fatherName}</td></tr>
      <tr><td style="padding:3px 0; color:#555;">Mother's Name</td><td style="padding:3px 0;">: ${student.motherName}</td></tr>
      <tr><td style="padding:3px 0; color:#555;">Registration Number</td><td style="padding:3px 0; font-weight:bold;">: ${student.registrationNumber}</td></tr>
      <tr><td style="padding:3px 0; color:#555;">Roll Number</td><td style="padding:3px 0;">: ${student.rollNumber}</td></tr>
      <tr><td style="padding:3px 0; color:#555;">Course</td><td style="padding:3px 0;">: ${student.courseName}${student.courseCode ? ` (${student.courseCode})` : ''}</td></tr>
      <tr><td style="padding:3px 0; color:#555;">Session</td><td style="padding:3px 0;">: ${student.sessionFrom} to ${student.sessionTo}</td></tr>
      <tr><td style="padding:3px 0; color:#555;">Center of Examination</td><td style="padding:3px 0;">: ${student.centerOfExamination || 'Main Center'}</td></tr>
    </table>
    <table style="width:100%; border-collapse:collapse; margin-bottom:5mm;">
      <thead>
        <tr style="background:#1a3a6a; color:#fff;">
          <th style="padding:6px 8px; border:1px solid #1a3a6a; font-size:8pt; text-align:center;">#</th>
          <th style="padding:6px 8px; border:1px solid #1a3a6a; font-size:8pt; text-align:left;">Subject</th>
          <th style="padding:6px 8px; border:1px solid #1a3a6a; font-size:8pt; text-align:center;">Max<br/>Theory</th>
          <th style="padding:6px 8px; border:1px solid #1a3a6a; font-size:8pt; text-align:center;">Obt.<br/>Theory</th>
          <th style="padding:6px 8px; border:1px solid #1a3a6a; font-size:8pt; text-align:center;">Max<br/>Prac.</th>
          <th style="padding:6px 8px; border:1px solid #1a3a6a; font-size:8pt; text-align:center;">Obt.<br/>Prac.</th>
          <th style="padding:6px 8px; border:1px solid #1a3a6a; font-size:8pt; text-align:center;">Max<br/>Total</th>
          <th style="padding:6px 8px; border:1px solid #1a3a6a; font-size:8pt; text-align:center;">Obt.<br/>Total</th>
          <th style="padding:6px 8px; border:1px solid #1a3a6a; font-size:8pt; text-align:center;">%</th>
        </tr>
      </thead>
      <tbody>${subjectRows}</tbody>
      <tfoot>
        <tr style="background:#e8edf5; font-weight:bold;">
          <td colspan="6" style="padding:6px 8px; border:1px solid #ddd; text-align:right; font-size:9pt;">Grand Total</td>
          <td style="padding:6px 8px; border:1px solid #ddd; text-align:center; font-size:9pt;">${student.totalMax}</td>
          <td style="padding:6px 8px; border:1px solid #ddd; text-align:center; font-size:9pt; color:#1a4a9a;">${student.totalObtained}</td>
          <td style="padding:6px 8px; border:1px solid #ddd; text-align:center; font-size:9pt;">${student.percentage}%</td>
        </tr>
      </tfoot>
    </table>
    <div style="display:flex; gap:4mm; margin-bottom:8mm;">
      <div style="flex:1; border:1px solid #ddd; padding:4mm; text-align:center;">
        <div style="font-size:8pt; color:#777; margin-bottom:2px;">Total Marks</div>
        <div style="font-size:14pt; font-weight:bold; color:#1a3a6a;">${student.totalObtained} / ${student.totalMax}</div>
      </div>
      <div style="flex:1; border:1px solid #ddd; padding:4mm; text-align:center;">
        <div style="font-size:8pt; color:#777; margin-bottom:2px;">Percentage</div>
        <div style="font-size:14pt; font-weight:bold; color:#1a3a6a;">${student.percentage}%</div>
      </div>
      <div style="flex:1; border:1px solid #ddd; padding:4mm; text-align:center;">
        <div style="font-size:8pt; color:#777; margin-bottom:2px;">Grade</div>
        <div style="font-size:14pt; font-weight:bold; color:${gradeColor};">${student.grade}</div>
      </div>
      <div style="flex:1; border:1px solid #ddd; padding:4mm; text-align:center;">
        <div style="font-size:8pt; color:#777; margin-bottom:2px;">Result</div>
        <div style="font-size:14pt; font-weight:bold; color:${student.result === 'PASS' ? '#1a7a1a' : '#dc2626'};">${student.result}</div>
      </div>
    </div>
    <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-top:8mm;">
      <div style="text-align:center;">
        <div style="font-size:8pt; color:#555; margin-bottom:2mm;">Issue Date: <strong>${student.issueDate}</strong></div>
        <div style="width:50mm; border-top:1px solid #333; padding-top:3px; font-size:8pt; color:#555;">Student Signature</div>
      </div>
      <div style="text-align:center;">
        ${qrCodeDataUrl ? `<img src="${qrCodeDataUrl}" style="width:20mm; height:20mm;" /><br/><span style="font-size:6pt; color:#888;">Scan to Verify</span>` : ''}
      </div>
      <div style="text-align:center;">
        <div style="width:50mm; border-top:1px solid #333; padding-top:3px; font-size:8pt; color:#555;">Principal / Director</div>
      </div>
    </div>
    <div style="text-align:center; margin-top:5mm; font-size:7pt; color:#888; border-top:1px solid #ddd; padding-top:3mm;">
      This marksheet is computer generated. Verify at: ${serverUrl}/verify/${student.registrationNumber}
    </div>
  </div>`;
};

export const generatePDF = async (student) => {
  const serverUrl = process.env.SERVER_URL || 'https://ddsgroup.onrender.com';

  const qrCodeDataUrl = await generateQRCode(student.registrationNumber, serverUrl);

  let photoBase64 = null;
  if (student.photoUrl) {
    const photoPath = path.join(__dirname, '..', student.photoUrl.replace(/^\//, ''));
    photoBase64 = getImageBase64(photoPath);
  }

  const certificateHTML = generateCertificateHTML(student, qrCodeDataUrl, photoBase64, serverUrl);
  const marksheetHTML = generateMarksheetHTML(student, qrCodeDataUrl, serverUrl);

  const fullHTML = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { background: #fff; }
      @page { size: A4; margin: 0; }
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
    defaultViewport: chromium.defaultViewport,
    executablePath,
    headless: chromium.headless,
  });

  try {
    const page = await browser.newPage();
    await page.setContent(fullHTML, { waitUntil: 'networkidle0' });

    const pdfFilename = `certificate-${student.registrationNumber}-${Date.now()}.pdf`;
    const pdfPath = path.join(pdfsDir, pdfFilename);

    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 }
    });

    return `/uploads/pdfs/${pdfFilename}`;
  } finally {
    await browser.close();
  }
};