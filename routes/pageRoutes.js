import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} from "../controllers/studentController.js";

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);
const pageRouter = express.Router();

// Basic route to confirm server is working
pageRouter.get("/", (req, res) => {
  res.sendFile(join(dirName, "../public", "index.html"));
});

// Student routes
pageRouter.post("/students", createStudent);
pageRouter.get("/students", getStudents);
pageRouter.get("/students/:id", getStudentById);
pageRouter.put("/students/:id", updateStudent);
pageRouter.delete("/students/:id", deleteStudent);

export default pageRouter;
