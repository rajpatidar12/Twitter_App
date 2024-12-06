import express from "express";
import morgan from "morgan";
import { PORT } from "../config/serverConfig.js";
import apiRouter from "../routes/apiRoutes.js";
import connectDB from "../config/dbConfig.js";
import multer from "multer";

// Create a new express app/server object
const app = express();
console.log(import.meta);

// Set view engine and views directory
app.set("view engine", "ejs");
app.set("views", import.meta.dirname + "/views");

// Middleware for logging requests
app.use(morgan("combined"));

// Middleware for parsing request bodies
app.use(express.json()); // For JSON payloads
app.use(express.urlencoded({ extended: true })); // For URL-encoded form data (including nested data)

// Set up multer for handling file uploads
const upload = multer({ dest: "uploads/" }); // Adjust destination as needed

// Routes
app.use("/api", apiRouter);
app.get("/", (req, res) => {
  res.render("home", { name: "John Doe" });
});

// Test endpoint
app.get("/ping", (req, res) => {
  return res.json({
    message: "pong",
  });
});

// Catch-all route for undefined endpoints
app.all("*", (req, res) => {
  return res.status(404).json({
    message: "Not found",
  });
});

// Define the server port and start listening
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
