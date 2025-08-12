import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import pageRouter from "./routes/pageRoutes.js";

// Load .env variables
dotenv.config();

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);

// Initialize express
const app = express();

// Middleware to parse JSON request
app.use(express.json());

// Reference mongoDB url from .env file
const mongoURL = process.env.MONGO_URL;

// Connect to MongoDb
mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("Connected to MongoDb Successfully!");
  })
  .catch((err) => {
    console.error("MongoDb connection error:", err);
  });

// serve static HTML files from /public
app.use(express.static(join(dirName, "public")));
// Routes for HTML Pages
app.use("/", pageRouter);

app.listen(3000, () => {
  console.log("Server is up!");
});
