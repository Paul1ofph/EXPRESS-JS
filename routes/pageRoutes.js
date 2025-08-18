import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
// import Student from "../model/student.js";
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

// Route to add a new student
// pageRouter.post("/students", async (req, res) => {
//   try {
//     const saveStudent = new Student(req.body);
//     await saveStudent.save(); // Save to DB
//     res.status(201).json(saveStudent);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// // READ ALL -  to get all students
// pageRouter.get("/students", async (req, res) => {
//   try {
//     const students = await Student.find();
//     res.json(students);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });
// // READ ONE - Get a student by ID
// pageRouter.get("/students/:id", async (req, res) => {
//   try {
//     const student = await Student.findById(req.params.id);
//     if(!student) return res.status(404).json({message:"Student not found"});
//     res.json(student);
//   } catch (error) {
//     res.status(500).json({error: error.message});
//   }
// });

// // UPDATE - Edit student by ID
// pageRouter.put("/students/:id", async (req, res) => {
//   try {
//     const student = await Student.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       // return updated doc & validate
//       { new: true, runValidators: true }
//     );
//     if (!student) return res.status(404).json({ message: "Student not found" });
//     res.json(student);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// // DELETE - Remove a student by ID
// pageRouter.delete("/students/:id", async (req, res) => {
//   try {
//     const student = await Student.findByIdAndDelete(req.params.id);
//     if (!student) return res.status(404).json({ message: "Student not found" });
//     res.json({ message: "Student deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });
export default pageRouter;
