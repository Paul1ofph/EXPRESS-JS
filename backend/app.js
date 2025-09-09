import express from "express";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import pageRouter from "./routes/pageRoutes.js";
import connectDB from "./config/db.js";
import cors from 'cors'

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
app.use(cors({
  origin: 'http://localhost:5174',
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowedHeaders: [
      "Content-Type",
      "Authorization",
      'Cache-Control',
      'Expires',
      'Pragma'
  ],
  credentials: true
}))

// serve static HTML files from /public
app.use(express.static(join(dirName, "public")));
// Routes for HTML Pages
app.use("/", pageRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is up! @ localhost:${PORT}`);
});
