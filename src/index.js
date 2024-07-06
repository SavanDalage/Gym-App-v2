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
      from: "bastete@02.pl",
      subject: "Formularz Treningowy - Zgłoszenie",
      text: "New form submission",
      html: `<pre>${JSON.stringify(data)}</pre>`,
      //       html: `<!DOCTYPE html>
      // <html lang="en">
      //   <head>
      //     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      //     <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      //     <title>Simple Transactional Email</title>
      //     <style media="all" type="text/css">
      //       /* -------------------------------------
      //     GLOBAL RESETS
      // ------------------------------------- */

      //       body {
      //         font-family: Helvetica, sans-serif;
      //         -webkit-font-smoothing: antialiased;
      //         font-size: 16px;
      //         line-height: 1.3;
      //         -ms-text-size-adjust: 100%;
      //         -webkit-text-size-adjust: 100%;
      //       }

      //       table {
      //         border-collapse: separate;
      //         mso-table-lspace: 0pt;
      //         mso-table-rspace: 0pt;
      //         width: 100%;
      //       }

      //       table td {
      //         font-family: Helvetica, sans-serif;
      //         font-size: 16px;
      //         vertical-align: top;
      //       }
      //       /* -------------------------------------
      //     BODY & CONTAINER
      // ------------------------------------- */

      //       body {
      //         background-color: #f4f5f6;
      //         margin: 0;
      //         padding: 0;
      //       }

      //       .body {
      //         background-color: #f4f5f6;
      //         width: 100%;
      //       }

      //       .container {
      //         margin: 0 auto !important;
      //         max-width: 600px;
      //         padding: 0;
      //         padding-top: 24px;
      //         width: 600px;
      //       }

      //       /* -------------------------------------
      //     HEADER, FOOTER, MAIN
      // ------------------------------------- */

      //       .main {
      //         background: #ffffff;
      //         border: 1px solid #eaebed;
      //         border-radius: 16px;
      //         width: 100%;
      //       }

      //       .wrapper {
      //         box-sizing: border-box;
      //         padding: 24px;
      //       }

      //       /* -------------------------------------
      //     TYPOGRAPHY
      // ------------------------------------- */

      //       p {
      //         font-family: Helvetica, sans-serif;
      //         font-size: 16px;
      //         font-weight: normal;
      //         margin: 0;
      //         margin-bottom: 16px;
      //       }

      //       /* -------------------------------------
      //     OTHER STYLES THAT MIGHT BE USEFUL
      // ------------------------------------- */

      //       .preheader {
      //         color: transparent;
      //         display: none;
      //         height: 0;
      //         max-height: 0;
      //         max-width: 0;
      //         opacity: 0;
      //         overflow: hidden;
      //         mso-hide: all;
      //         visibility: hidden;
      //         width: 0;
      //       }

      //       /* -------------------------------------
      //     RESPONSIVE AND MOBILE FRIENDLY STYLES
      // ------------------------------------- */

      //       @media only screen and (max-width: 640px) {
      //         .main p,
      //         .main td,
      //         .main span {
      //           font-size: 16px !important;
      //         }
      //         .wrapper {
      //           padding: 8px !important;
      //         }

      //         .container {
      //           padding: 0 !important;
      //           padding-top: 8px !important;
      //           width: 100% !important;
      //         }
      //         .main {
      //           border-left-width: 0 !important;
      //           border-radius: 0 !important;
      //           border-right-width: 0 !important;
      //         }
      //       }
      //       /* -------------------------------------
      //     PRESERVE THESE STYLES IN THE HEAD
      // ------------------------------------- */

      //       @media all {
      //         .ExternalClass {
      //           width: 100%;
      //         }
      //         .ExternalClass,
      //         .ExternalClass p,
      //         .ExternalClass span,
      //         .ExternalClass font,
      //         .ExternalClass td,
      //         .ExternalClass div {
      //           line-height: 100%;
      //         }

      //         #MessageViewBody a {
      //           color: inherit;
      //           text-decoration: none;
      //           font-size: inherit;
      //           font-family: inherit;
      //           font-weight: inherit;
      //           line-height: inherit;
      //         }
      //       }
      //     </style>
      //   </head>
      //   <body>
      //     <table
      //       role="presentation"
      //       border="0"
      //       cellpadding="0"
      //       cellspacing="0"
      //       class="body"
      //     >
      //       <tr>
      //         <td>&nbsp;</td>
      //         <td class="container">
      //           <div class="content">
      //             <table
      //               role="presentation"
      //               border="0"
      //               cellpadding="0"
      //               cellspacing="0"
      //               class="main"
      //             >
      //               <!-- START MAIN CONTENT AREA -->
      //               <tr>
      //                 <td class="wrapper">
      //                   <p><strong>Nowy formularz</strong></p>
      //                   <p>Imię: ${data.imie}</p>
      //                   <p>Nazwisko: ${data.nazwisko}</p>
      //                   <p>Preferencje rodzaju treningu:</p>
      //                   <p>
      //                     Trening w pojedynkę: ${
      //                       data.preferencje_treningu1 ? "tak" : "nie"
      //                     }
      //                   </p>
      //                   <p>
      //                     Trening w 2 osoby: ${
      //                       data.preferencje_treningu2 ? "tak" : "nie"
      //                     }
      //                   </p>
      //                   <p>
      //                     Trening w 3 osoby: ${
      //                       data.preferencje_treningu3 ? "tak" : "nie"
      //                     }
      //                   </p>

      //                   <p>E-mail: ${data.email}</p>

      //                   <p>Telefon: ${data.phone}</p>

      //                   <p>Cel treningu: ${data.cel}</p>

      //                   <p>Dotychczasowe doświadczenie: ${data.doswiadczenie}</p>

      //                   <p>Preferowane dni i godziny treningu: ${data.czas}</p>
      //                 </td>
      //               </tr>

      //               <!-- END MAIN CONTENT AREA -->
      //             </table>

      //             <!-- END CENTERED WHITE CONTAINER -->
      //           </div>
      //         </td>
      //         <td>&nbsp;</td>
      //       </tr>
      //     </table>
      //   </body>
      // </html>

      // `,
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
