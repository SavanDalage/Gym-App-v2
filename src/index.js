const express = require("express");
const cors = require("cors");
const path = require("path");
const sgMail = require("@sendgrid/mail");

const app = express();

// Middleware to serve static files
app.use(express.static(path.join(__dirname, "../public")));

// Middleware to parse JSON request bodies
app.use(express.json());

const corsOptions = {
  origin: "*",
  methods: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  allowedHeaders:
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  exposedHeaders: "X-Requested-With",
  credentials: true,
  optionsSuccessStatus: 204,
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests
app.options("*", cors(corsOptions));

sgMail.setApiKey(process.env.SENDGRID_PASSWORD);

// Define routes
app.post("/", async (req, res) => {
  console.log("POST /forms endpoint hit");
  const data = req.body;

  try {
    const emailData = {
      to: "bastete@02.pl",
      from: "nekomimiwolf@gmail.com",
      subject: "Formularz Treningowy - Zgłoszenie",
      text: "New form submission",
      // html: `<pre>${JSON.stringify(data)}</pre>`,
      html: `<!DOCTYPE html>
<html lang="pl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Formularz Zapisu</title>
    <style media="all" type="text/css">
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      html {
        color: #f3e7dc;
        font-size: 1rem;
      }

      body {
        font-family: "Inter", sans-serif;
        height: 100dvh;
        background-color: black;
        display: flex;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        position: relative;
      }

      /* ****************************** */
      /* Reusable code */
      /* ****************************** */

      .container {
        width: 100%;
        height: 100dvh;
        position: relative;
        overflow-y: scroll;
        scroll-behavior: smooth;
      }

      .form-container {
        max-width: 700px;
        padding: 20px;
        border: 1px solid rgb(255, 81, 0);
        margin: 1rem auto;
      }

      form {
        display: flex;
        flex-direction: column;
      }

      h1 {
        color: #f76707;
        text-align: center;
        margin-bottom: 20px;
        font-size: 2rem;
      }

      p {
        margin: 10px 0 5px;
      }

      @media (max-width: 500px) {
        .button-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="form-container">
        <form id="training-form">
          <h1>Formularz nadesłany przez</h1>
          <p>Imię: ${data.imie}</p>
          <p for="nazwisko">Nazwisko: ${data.nazwisko}</p>
          <p>Preferencje rodzaju treningu:</p>
          <p>Trening w pojedynkę: ${
            data.preferencje_treningu1 ? "tak" : "nie"
          }</p>
          <p>Trening w 2 osoby: ${
            data.preferencje_treningu2 ? "tak" : "nie"
          }</p>
          <p>Trening w 3 osoby: ${
            data.preferencje_treningu3 ? "tak" : "nie"
          }</p>

          <p>E-mail: ${data.email}</p>

          <p>Telefon: ${data.phone}</p>

          <p>Cel treningu: ${data.cel}</p>

          <p>Dotychczasowe doświadczenie: ${data.doswiadczenie}</p>

          <p>Preferowane dni i godziny treningu: ${data.czas}</p>
        </form>
      </div>
    </div>
  </body>
</html>
`,
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

// Start the server
const port = process.env.PORT || 5500;
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
