const express = require("express");
const sgMail = require("@sendgrid/mail");
const createEmailTemplate = require("./../email/email");

// nowe - start
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const { body, validationResult } = require("express-validator");
const xssFilters = require("xss-filters");
// nowe - end

const router = express.Router();
sgMail.setApiKey(process.env.SENDGRID_PASSWORD);

// nowe - stert
router.use(helmet());

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, 
  max: 10, 
  message: "Too many requests, please try again later.",
});

router.use(limiter);
// nowe -end

router
  .route("/")
  .get((req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
  })
  .post(
    // nowe start
    // body("name").isString().trim().escape(),
    // body("email").isEmail().normalizeEmail(),
    // body("message").isString().trim().escape(),
    // nowe -end
    async (req, res) => {
    console.log("POST /forms endpoint hit");

    // nowe - start
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }
    // nowe - end

    try {
      const data = req.body;

      // const sanitizedData = {
      //   name: xssFilters.inHTMLData(req.body.name),
      //   email: xssFilters.inHTMLData(req.body.email),
      //   message: xssFilters.inHTMLData(req.body.message),
      // };

      const emailHtml = createEmailTemplate(data);
      // const emailHtml = createEmailTemplate(sanitizedData);

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
