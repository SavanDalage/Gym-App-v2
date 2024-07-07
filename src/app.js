const path = require("path");
const express = require("express");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");

const postRouter = require("./routes/postRoutes");

const app = express();

// Middleware to serve static files
app.use(express.static(path.join(__dirname, "../public")));

// Middleware to parse JSON request bodies
app.use(express.json());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// CORS section
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

// Data sanitization against XSS
app.use(xss());

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/", limiter);

// Define routes

app.use("/", postRouter);

module.exports = app;
