const express = require("express");
const cors = require("cors");
const path = require("path");
// const sgMail = require("@sendgrid/mail");

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

// sgMail.setApiKey(process.env.SENDGRID_PASSWORD);

// Define routes
app.post("/", async (req, res) => {
  console.log("POST /forms endpoint hit");
  const data = req.body;
  // const stringifyData = JSON.parse(data);
  const stringifyData = JSON.stringify(data);
  const stringifyData2 = JSON.stringify(data, null, 2);

  console.log(typeof stringifyData);
  console.log(typeof stringifyData2);

  console.log("Form data received:", data);
  console.log(`parse data: " ${stringifyData}`);
  console.log(`Stringify data 2: " ${stringifyData2}`);

  // console.log(`${stringifyData2[0]}`);
  // console.log(`${stringifyData2[1]}`);
  // console.log(`${stringifyData2[2]}`);
  // console.log(`${stringifyData2[3]}`);
  // console.log(`${stringifyData2[4]}`);
  // console.log(`${stringifyData2[5]}`);
  // console.log(`${stringifyData2[6]}`);
  // console.log(`${stringifyData2[7]}`);
  // console.log(`${stringifyData2[8]}`);
  // console.log(`${stringifyData2[9]}`);

  try {
    // const emailData = {
    //   to: "nekomimiwolf@gmail.com",
    //   from: "nekomimiwolf@gmail.com",
    //   subject: "Formularz Treningowy - Zgłoszenie",
    //   text: "New form submission",
    //   html: `<pre>${JSON.stringify(data, null, 2)}</pre>`,
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
              name: "Formularz zapisu",
            },
          ],
          dynamic_template_data: {
            name: "Cos",
          },
        },
      ],
      template_id: "d-f25c6872e5a04234b0ef8748a2eaeba4",
    };

    console.log(emailData);

    // await sgMail.send(emailData);
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
  res.status(200).json({ message: "Formularz wysłany" });
});

// Start the server
const port = process.env.PORT || 5500;
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
