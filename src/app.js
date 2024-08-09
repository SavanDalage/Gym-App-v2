const path = require("path");
const express = require("express");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");

const postRouter = require("./routes/postRoutes");

const app = express();

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());
app.use(mongoSanitize());
app.use(xss());

// CORS
const corsOptions = {
  origin: "*",
  methods: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  allowedHeaders:
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  exposedHeaders: "X-Requested-With",
  credentials: true,
  optionsSuccessStatus: 204,
};

//  CORS middleware
app.use(cors(corsOptions));

app.options("*", cors(corsOptions));



const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/", limiter);

// routes
app.use("/", postRouter);

module.exports = app;