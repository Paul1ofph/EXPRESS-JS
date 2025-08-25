import express from "express";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import pageRouter from "./routes/pageRoutes.js";
import connectDB from "./config/db.js";

// Load .env variables
dotenv.config();
// Connect to the MongoDB database
connectDB();

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);

// Initialize express
const app = express();

// Middleware to parse JSON request
app.use(express.json());

// serve static HTML files from /public
app.use(express.static(join(dirName, "public")));
// Routes for HTML Pages
app.use("/", pageRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is up! @ localhost:${PORT}`);
});
