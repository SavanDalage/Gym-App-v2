const express = require("express");
const sgMail = require("@sendgrid/mail");
const createEmailTemplate = require("./../email/email");

const { body, validationResult } = require("express-validator");
const xssFilters = require("xss-filters");

const router = express.Router();
sgMail.setApiKey(process.env.SENDGRID_PASSWORD);

router
  .route("/")
  .get((req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
  })
  .post(
    body("name").isString().trim().escape(),
    body("email").isEmail().normalizeEmail(),
    body("message").isString().trim().escape(),
    async (req, res) => {
    console.log("POST /forms endpoint hit");

      // Check validation results
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

    try {
      // const data = req.body;
      const sanitizedData = {
        name: xssFilters.inHTMLData(req.body.name),
        email: xssFilters.inHTMLData(req.body.email),
        message: xssFilters.inHTMLData(req.body.message),
      };

      // const emailHtml = createEmailTemplate(data);
      const emailHtml = createEmailTemplate(sanitizedData);

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