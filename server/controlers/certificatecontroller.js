import puppeteer from "puppeteer";
import Certificate from "../model/Certificate.js";
import path from "path";

export const generatePDF = async (req, res) => {
  try {
    const cert = await Certificate.findById(req.params.id);

    const html = `
    <html>
    <head>
    <style>

    body{
      font-family: Arial;
      padding:40px;
    }

    .page{
      width:100%;
      height:100vh;
      page-break-after:always;
      position:relative;
    }

    .logo{
      text-align:center;
      font-size:40px;
      font-weight:bold;
      color:#b91c1c;
    }

    .title{
      text-align:center;
      font-size:30px;
      margin-top:20px;
    }

    .photo{
      position:absolute;
      right:50px;
      top:120px;
      width:120px;
    }

    table{
      width:100%;
      border-collapse:collapse;
      margin-top:40px;
    }

    td,th{
      border:1px solid black;
      padding:8px;
    }

    </style>
    </head>

    <body>

    <!-- page 1 -->
    <div class="page">

    <div class="logo">DDS</div>

    <div class="title">
    Certificate
    </div>

    <img src="http://localhost:5000/uploads/${cert.photo}" class="photo"/>

    <p>This certificate is awarded to</p>

    <h2>${cert.name} S/O ${cert.fatherName}</h2>

    <p>Course: ${cert.course}</p>

    <p>Duration: ${cert.duration}</p>

    <p>From ${cert.startDate} to ${cert.endDate}</p>

    <p>Grade: ${cert.grade}</p>

    </div>

    <!-- page 2 -->
    <div class="page">

    <h2>Statement of Marks</h2>

    <table>

    <tr>
    <th>Subject</th>
    <th>Theory</th>
    <th>Practical</th>
    <th>Total</th>
    </tr>

    ${cert.subjects.map(s=>`
    <tr>
    <td>${s.name}</td>
    <td>${s.theory}</td>
    <td>${s.practical}</td>
    <td>${s.total}</td>
    </tr>
    `).join("")}

    </table>

    <h3>Total Marks: ${cert.totalMarks}</h3>

    </div>

    </body>
    </html>
    `;

    const browser = await puppeteer.launch();

    const page = await browser.newPage();

    await page.setContent(html);

    const pdf = await page.pdf({
      format:"A4"
    });

    await browser.close();

    res.set({
      "Content-Type":"application/pdf",
      "Content-Disposition":"attachment; filename=certificate.pdf"
    });

    res.send(pdf);

  } catch(err) {
    res.status(500).json(err);
  }
};