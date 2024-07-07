const express = require("express");

const router = express.Router();

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
        html: `<pre>
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
        }.</pre>`,
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
    // res.status(200).json({ message: "Formularz wysłany" });
  });

app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

module.exports = router;
