const express = require("express");
const sgMail = require("@sendgrid/mail");

const router = express.Router();
sgMail.setApiKey(process.env.SENDGRID_PASSWORD);

router
  .route("/")
  .get((req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
  })
  .post(async (req, res) => {
    console.log("POST /forms endpoint hit");
    const data = req.body;

    try {
      const emailData = {
        to: "bastete@o2.pl",
        from: "nekomimiwolf@gmail.com",
        subject: "Formularz Treningowy - Zgłoszenie",
        text: "New form submission",
        html: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Formularz kontaktowy</title>
    <style>
        body {
            font-family: Arial, sans-serif;
        }
        .container {
            width: 50%;
            margin: 0 auto;
            border: 2px solid #000;
            padding: 20px;
            text-align: center;
        }
        .container p {
            margin: 10px 0;
        }
        .container strong {
            display: inline-block;
            width: 150px;
            text-align: right;
            margin-right: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <p><strong>Imię:</strong> ${data.imie}</p>
        <p><strong>Nazwisko:</strong> ${data.nazwisko}</p>
        <p><strong>E-mail:</strong> ${data.email}</p>
        <p><strong>Telefon:</strong> ${data.phone}</p>
        <p><strong>Czas:</strong> ${data.czas}</p>
        <p><strong>Doświadczenie:</strong> ${data.doswiadczenie}</p>
        <p><strong>Preferencje treningowe:</strong> ${
          data.preferencje_treningu1 ? data.preferencje_treningu1 + " " : ""
        } ${
          data.preferencje_treningu2 ? data.preferencje_treningu2 + " " : ""
        } ${data.preferencje_treningu3 ? data.preferencje_treningu3 : ""}</p>
    </div>
</body>
</html>`,
      };

      console.log(emailData);

      await sgMail.send(emailData);
      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error(
        "Error sending email:",
        error.response ? error.response.body : error
      );
      res
        .status(500)
        .json({ message: "Error sending email", error: error.toString() });
    }
  });

module.exports = router;

/* <pre>
Imię: ${JSON.stringify(data.imie)}, 

Nazwisko: ${JSON.stringify(data.nazwisko)}, 

E-mail: ${JSON.stringify(data.email)}, 

Telefon: ${JSON.stringify(data.phone)}, 

Czas: ${JSON.stringify(data.czas)}, 

Doświadczenie: ${JSON.stringify(data.doswiadczenie)}, 

Preferencje treningowe: ${
  data.preferencje_treningu1
    ? JSON.stringify(data.preferencje_treningu1)
    : ""
} ${
  data.preferencje_treningu2
    ? JSON.stringify(data.preferencje_treningu2)
    : ""
} ${
  data.preferencje_treningu3
    ? JSON.stringify(data.preferencje_treningu3)
    : ""
}.</pre> */
