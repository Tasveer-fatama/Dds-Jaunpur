import { PDFDocument } from "pdf-lib";
import fs from "fs";

async function generatePDF(data) {
  const pdfDoc = await PDFDocument.create();

  const certImg = await pdfDoc.embedJpg(
    fs.readFileSync("./templates/certificate.jpg")
  );

  const markImg = await pdfDoc.embedJpg(
    fs.readFileSync("./templates/marksheet.jpg")
  );

  // ===== CERTIFICATE PAGE =====
  const page1 = pdfDoc.addPage([595, 842]);
  page1.drawImage(certImg, { x: 0, y: 0, width: 595, height: 842 });

  page1.drawText(data.name || "", { x: 220, y: 470, size: 18 });
  page1.drawText(data.fatherName || "", { x: 220, y: 440, size: 14 });

  page1.drawText(data.course || "", { x: 140, y: 360, size: 14 });
  page1.drawText(data.duration || "", { x: 350, y: 360, size: 14 });

  const sessionFrom = data.session?.split("to")[0] || "";
  const sessionTo = data.session?.split("to")[1] || "";

  page1.drawText(sessionFrom, { x: 180, y: 310 });
  page1.drawText(sessionTo, { x: 350, y: 310 });

  page1.drawText(data.grade || "", { x: 250, y: 260 });

  // ===== MARKSHEET PAGE =====
  const page2 = pdfDoc.addPage([595, 842]);
  page2.drawImage(markImg, { x: 0, y: 0, width: 595, height: 842 });

  page2.drawText(data.name || "", { x: 150, y: 650 });
  page2.drawText(data.fatherName || "", { x: 150, y: 620 });
  page2.drawText(data.regNo || "", { x: 400, y: 620 });
  page2.drawText(data.course || "", { x: 400, y: 650 });

  // SUBJECT TABLE
  let y = 500;

  (data.subjects || []).forEach((sub, i) => {
    const theory = Number(sub.theory) || 0;
    const practical = Number(sub.practical) || 0;
    const total = theory + practical;

    page2.drawText(`${i + 1}`, { x: 50, y });
    page2.drawText(sub.name || "", { x: 80, y });

    page2.drawText(theory.toString(), { x: 260, y });
    page2.drawText(practical.toString(), { x: 350, y });
    page2.drawText(total.toString(), { x: 450, y });

    y -= 30;
  });

  page2.drawText(`Total: ${Number(data.total) || 0}`, { x: 400, y: 200 });

  const pdfBytes = await pdfDoc.save();

  const filePath = `./pdfs/${data.regNo}.pdf`;
  fs.writeFileSync(filePath, pdfBytes);

  return filePath;
}

export default generatePDF;