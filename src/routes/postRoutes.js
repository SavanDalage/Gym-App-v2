const express = require("express");
const sgMail = require("@sendgrid/mail");
const createEmailTemplate = require("./../email/email");

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
      const data = req.body;
      const emailHtml = createEmailTemplate(data);

      const emailData = {
        to: "bastete@o2.pl",
        from: "nekomimiwolf@gmail.com",
        subject: "Formularz Treningowy - Zgłoszenie",
        text: "New form submission",
        html: emailHtml,
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
