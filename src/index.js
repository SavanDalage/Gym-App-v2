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
    // const emailData = {
    //   to: "nekomimiwolf@gmail.com",
    //   from: "nekomimiwolf@gmail.com",
    //   subject: "Formularz Treningowy - Zgłoszenie",
    //   text: "New form submission",
    //   html: `<pre>
    //   ${JSON.stringify(data)}</pre>`,
    // };

    const emailData = {
      from: {
        email: "nekomimiwolf@gmail.com",
      },
      personalization: [
        {
          to: [
            {
              email: "nekomimiwolf@gmail.com",
              name: data.imie,
            },
          ],
          dynamic_template_data: {
            name: data.imie,
            nazwisko: data.nazwisko,
            preferencje_treningu1: data.preferencje_treningu1
              ? data.preferencje_treningu1
              : "nie",
            preferencje_treningu2: data.preferencje_treningu2
              ? data.preferencje_treningu2
              : "nie",
            preferencje_treningu3: data.preferencje_treningu3
              ? data.preferencje_treningu3
              : "nie",
            email: data.email,
            phone: data.phone,
            cel: data.cel,
            doswiadczenie: data.doswiadczenie,
            czas: data.czas,
          },
        },
      ],
      template_id: "d-f25c6872e5a04234b0ef8748a2eaeba4",
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
