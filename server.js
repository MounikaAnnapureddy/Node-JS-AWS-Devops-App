const express = require("express");
const app = express();
const { resolve } = require("path");
const port = process.env.PORT || 3000;

// importing the dotenv module to use environment variables:
require("dotenv").config();
const nodemailer = require("nodemailer");
const api_key = process.env.SECRET_KEY;
const emailUser = process.env.EMAIL_USER;
const emailPassword = process.env.EMAIL_PASSWORD;
const stripe = require("stripe")(api_key);
const PDFDocument = require("pdfkit");
// ------------ Imports & necessary things here ------------

// Setting up the static folder:
// app.use(express.static(resolve(__dirname, "./client")));
app.use(express.static(resolve(__dirname, process.env.STATIC_DIR)));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  const path = resolve(process.env.STATIC_DIR + "/index.html");
  res.sendFile(path);
});

// creating a route for success page:
app.get("/success", (req, res) => {
  const path = resolve(process.env.STATIC_DIR + "/success.html");
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.sendFile(path);
});

// creating a route for cancel page:
app.get("/cancel", (req, res) => {
  const path = resolve(process.env.STATIC_DIR + "/cancel.html");
  res.sendFile(path);
});

// Workshop page routes:
app.get("/Resume_MounikaAnnapureddy", (req, res) => {
  const pdfpath = resolve(process.env.STATIC_DIR + "/workshops/Resume_MounikaAnnapureddy.pdf");
  res.sendFile(path);
});

app.get("/ReviewForm", (req, res) => {
  const path = resolve(process.env.STATIC_DIR + "/workshops/ReviewForm.html");
  res.sendFile(path);
});
/*
app.get("/workshop3", (req, res) => {
  const path = resolve(process.env.STATIC_DIR + "/workshops/workshop3.html");
  res.sendFile(path);
});
*/
// ____________________________________________________________________________________

const domainURL = process.env.DOMAIN;
const transporter = nodemailer.createTransport({
  host: "localhost",
  port: 1025, // The port MailDev is configured to use
  ignoreTLS: true,
});
app.post("/submit-form", async (req, res) => {
  const formData = req.body;

  // Create a PDF document
  const pdfDoc = new PDFDocument();
  const pdfChunks = [];
  
  // ... PDF content creation ...
  pdfDoc.text(`New form submission from ${formData.name}`);
  pdfDoc.text(`Name: ${formData.name}`);
  pdfDoc.text(`Company Or College: ${formData.companyorCollege}`);
  pdfDoc.text(`Rating: ${formData.rating}`);
  pdfDoc.text(`Comments: ${formData.comments}`);
  pdfDoc.text(`Location: ${formData.location}`);
  pdfDoc.end();
  
  pdfDoc.on("data", (chunk) => pdfChunks.push(chunk));
  pdfDoc.on("end", async () => {
    const pdfBuffer = Buffer.concat(pdfChunks);

    const mailOptions = {
      from: formData.email ? formData.email : "noreply@example.com",
      to: emailUser,
      subject: "New Form Submission",
      text: `New form submission from ${formData.name}.\nDetails: ${JSON.stringify(formData)}`,
      html: `<p>New form submission from ${formData.name}.</p><p>Details: ${JSON.stringify(formData)}</p>`,
      attachments: [
        {
          filename: 'form-data.pdf',
          content: pdfBuffer.toString('base64'),
          encoding: 'base64',
        },
      ],
    };

    try {
      // Send the email
      await transporter.sendMail(mailOptions);
      // Instead of redirecting, send a JSON response indicating success
      res.json({ success: true });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({
        success: false,
        message: "Error submitting the form. Please try again.",
      });
    }
  });
});
// Server listening:
app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
  console.log(`You may access you app at: ${domainURL}`);
});
