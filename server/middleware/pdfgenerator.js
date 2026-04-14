import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import QRCode from 'qrcode';
import { fileURLToPath } from 'url';

// __dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create PDFs folder
const pdfsDir = path.join(__dirname, '../uploads/pdfs');
if (!fs.existsSync(pdfsDir)) {
  fs.mkdirSync(pdfsDir, { recursive: true });
}

// Grade color
const getGradeColor = (grade) => {
  const colors = {
    'A+': '#1a7a1a',
    'A': '#2563eb',
    'B+': '#7c3aed',
    'B': '#b45309',
    'C': '#b45309',
    'F': '#dc2626'
  };
  return colors[grade] || '#2563eb';
};

// QR Code
export const generateQRCode = async (registrationNumber, serverUrl) => {
  const verifyUrl = `${serverUrl}/verify/${registrationNumber}`;
  try {
    return await QRCode.toDataURL(verifyUrl, { width: 100, margin: 1 });
  } catch {
    return '';
  }
};

// Image to base64
const getImageBase64 = (filePath) => {
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

// Month name
const getMonthName = (dateStr) => {
  const months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
  const parts = dateStr.split('.');
  const monthNum = parseInt(parts[1]) - 1;
  return months[monthNum] || 'OCT';
};

// ------------------ HTML GENERATORS ------------------
// (Tumhara pura HTML same rakha hai — koi change nahi kiya)

// Certificate HTML
const generateCertificateHTML = (student, qrCodeDataUrl, photoBase64, serverUrl) => {
  return `...YOUR SAME HTML CODE HERE...`;
};

// Marksheet HTML
const generateMarksheetHTML = (student, qrCodeDataUrl, serverUrl) => {
  return `...YOUR SAME HTML CODE HERE...`;
};

// ------------------ MAIN PDF FUNCTION ------------------

export const generatePDF = async (student) => {
  const serverUrl = process.env.SERVER_URL || 'http://localhost:5000';

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

  const certificateHTML = generateCertificateHTML(
    student,
    qrCodeDataUrl,
    photoBase64,
    serverUrl
  );

  const marksheetHTML = generateMarksheetHTML(
    student,
    qrCodeDataUrl,
    serverUrl
  );

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

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
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