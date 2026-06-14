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
page-break-after:always;
">

<div style="
position:absolute;
top:110mm;
left:25mm;
width:160mm;
text-align:center;
font-size:24px;
font-weight:bold;
">
${student.studentName}
</div>

<div style="
position:absolute;
top:145mm;
left:25mm;
width:160mm;
text-align:center;
font-size:18px;
font-weight:bold;
">
${student.courseName}
</div>

<div style="
position:absolute;
top:192mm;
left:60mm;
font-size:16px;
">
${student.sessionFrom}
</div>

<div style="
position:absolute;
top:192mm;
left:120mm;
font-size:16px;
">
${student.sessionTo}
</div>

<div style="
position:absolute;
top:228mm;
left:72mm;
font-size:18px;
font-weight:bold;
">
${student.grade}
</div>

<div style="
position:absolute;
top:228mm;
left:120mm;
font-size:18px;
">
${student.duration}
</div>

${
photoBase64
?
`<img
src="${photoBase64}"
style="
position:absolute;
top:75mm;
right:20mm;
width:30mm;
height:35mm;
object-fit:cover;
border:1px solid #000;
"
/>`
:
''
}

${
qrCodeDataUrl
?
`<img
src="${qrCodeDataUrl}"
style="
position:absolute;
bottom:25mm;
right:20mm;
width:20mm;
height:20mm;
"
/>`
:
''
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
">

<div style="position:absolute;top:88mm;left:48mm;font-size:14px;">
${student.studentName}
</div>

<div style="position:absolute;top:101mm;left:60mm;font-size:14px;">
${student.fatherName}
</div>

<div style="position:absolute;top:88mm;left:145mm;font-size:14px;">
${student.courseName}
</div>

<div style="position:absolute;top:101mm;left:150mm;font-size:14px;">
${student.duration}
</div>

<div style="position:absolute;top:114mm;left:150mm;font-size:14px;">
${student.registrationNumber}
</div>

<div style="position:absolute;top:127mm;left:150mm;font-size:14px;">
${student.sessionFrom}-${student.sessionTo}
</div>

${
(student.subjects || [])
.map(
(subject, index) => `
<div style="position:absolute;top:${162 + index*15}mm;left:38mm;font-size:13px;">
${subject.name}
</div>

<div style="position:absolute;top:${162 + index*15}mm;left:122mm;font-size:13px;">
${subject.theoryMarks}
</div>

<div style="position:absolute;top:${162 + index*15}mm;left:145mm;font-size:13px;">
${subject.practicalMarks}
</div>

<div style="position:absolute;top:${162 + index*15}mm;left:175mm;font-size:13px;">
${Number(subject.theoryMarks)+Number(subject.practicalMarks)}
</div>
`
)
.join("")
}

<div style="
position:absolute;
top:236mm;
left:170mm;
font-size:18px;
font-weight:bold;
">
${student.totalObtained}
</div>

${
qrCodeDataUrl
?
`<img
src="${qrCodeDataUrl}"
style="
position:absolute;
bottom:25mm;
right:20mm;
width:20mm;
height:20mm;
"
/>`
:
''
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