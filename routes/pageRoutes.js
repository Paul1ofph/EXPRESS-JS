import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import {
  registerStudent,
  loginStudent,
} from "../controllers/authController.js";
import {
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} from "../controllers/myStudentController.js";

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);
const pageRouter = express.Router();

// Basic route to confirm server is working
pageRouter.get("/", (req, res) => {
  res.sendFile(join(dirName, "../public", "index.html"));
});

// Public authentication routes
pageRouter.post("/register", registerStudent);
pageRouter.post("/login", loginStudent);

// Student routes
// pageRouter.post("/students", createStudent);
pageRouter.get("/students", getStudents);
pageRouter.get("/students/:id", getStudentById);
pageRouter.put("/students/:id", updateStudent);
pageRouter.delete("/students/:id", deleteStudent);

export default pageRouter;
