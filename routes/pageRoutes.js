import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import protect from "../middleware/authMiddleware.js";
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
// Protected routes (middleware is applied)
pageRouter.get("/students", protect, getStudents);
pageRouter.get("/students/:id", protect, getStudentById);
pageRouter.put("/students/:id", protect, updateStudent);
pageRouter.delete("/students/:id", protect, deleteStudent);

export default pageRouter;
