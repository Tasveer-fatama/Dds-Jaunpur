import Certificate  from "../model/Certificate.js";

export const createCertificate = async (req, res) => {
  try {

    // subjects string ko array me convert
    let subjects = [];

    if (req.body.subjects) {
      subjects = JSON.parse(req.body.subjects);
    }

    const data = {
      ...req.body,
      subjects,
      photo: req.file ? req.file.filename : ""
    };

    const cert = await Certificate.create(data);

    res.status(201).json(cert);

  } catch (err) {

    res.status(500).json({
      message: "create error",
      error: err.message
    });

  }
};



// SEARCH CERTIFICATE
export const getCertificate = async (req, res) => {

  try {

    const { rollNumber, name, dob } = req.query;

    const cert = await Certificate.findOne({
      rollNumber,
      name,
      dob
    });

    if (!cert) {

      return res.status(404).json({
        message: "not found"
      });

    }

    res.json(cert);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

};



// GENERATE PDF (2 pages)
export const generatePDF = async (req, res) => {

  try {

    const cert = await Certificate.findById(req.params.id);

    if (!cert) {

      return res.status(404).json({
        message: "Certificate not found"
      });

    }


    // important for render deployment
    const baseURL =
      process.env.BASE_URL ||
      "https://ddsgroup.onrender.com";


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
font-size:42px;
font-weight:bold;
color:#991b1b;
}

.title{
text-align:center;
font-size:28px;
margin-top:20px;
}

.photo{
position:absolute;
right:60px;
top:140px;
width:120px;
height:140px;
object-fit:cover;
border:1px solid black;
}

.text{
margin-top:40px;
font-size:18px;
line-height:30px;
}

table{
width:100%;
border-collapse:collapse;
margin-top:30px;
}

td,th{
border:1px solid black;
padding:8px;
text-align:center;
}

.heading{
text-align:center;
font-size:24px;
margin-bottom:20px;
}

</style>

</head>

<body>


<!-- PAGE 1 CERTIFICATE -->

<div class="page">

<div class="logo">
DDS GROUP
</div>

<div class="title">
CERTIFICATE
</div>

<img
src="${baseURL}/uploads/${cert.photo}"
class="photo"
/>


<div class="text">

This is to certify that

<h2>${cert.name}</h2>

S/O ${cert.fatherName}

has successfully completed

<b>${cert.course}</b>

Duration:
${cert.duration}

From
${cert.startDate}
to
${cert.endDate}

Grade:
<b>${cert.grade}</b>

Issue Date:
${cert.issueDate}

</div>

</div>



<!-- PAGE 2 MARKSHEET -->

<div class="page">

<div class="heading">

STATEMENT OF MARKS

</div>


<table>

<tr>

<th>Subject</th>

<th>Theory</th>

<th>Practical</th>

<th>Total</th>

</tr>


${cert.subjects.map(s => `

<tr>

<td>${s.name}</td>

<td>${s.theory}</td>

<td>${s.practical}</td>

<td>${s.total}</td>

</tr>

`).join("")}



</table>



<h3>

Total Marks:
${cert.totalMarks}

</h3>


<h3>

Grade:
${cert.grade}

</h3>


</div>


</body>

</html>

`;


    const browser = await puppeteer.launch({

      args: ["--no-sandbox"]

    });


    const page = await browser.newPage();

    await page.setContent(html, {

      waitUntil: "networkidle0"

    });


    const pdf = await page.pdf({

      format: "A4",
      printBackground: true

    });


    await browser.close();


    res.set({

      "Content-Type": "application/pdf",

      "Content-Disposition":
        "attachment; filename=certificate.pdf"

    });


    res.send(pdf);


  } catch (err) {

    res.status(500).json({

      message: "pdf error",

      error: err.message

    });

  }

};