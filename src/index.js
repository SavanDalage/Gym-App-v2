const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const port = process.env.PORT || 5500;

app.use(express.static(path.join(__dirname, "../public")));

app.use(cors());
app.options("*", cors());

app.post("/", async (req, res) => {
  console.log("POST /forms endpoint hit");
  const data = req.body;

  console.log("Form data received:", data);

  res.status(200).json({ message: "Form submission received" });
});

app.get("/", (req, res) => {
  console.log("GET request incoming: " + req);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
