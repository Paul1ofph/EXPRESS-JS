import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import Student from "../model/student.js";

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);
const pageRouter = express.Router();

// Basic route to confirm server is working
pageRouter.get("/", (req, res) => {
  res.sendFile(join(dirName, "../public", "index.html"));
});

// Route to add a new student
pageRouter.post("/students", async (req, res) => {
  try {
    const saveStudent = new Student(req.body);
    await saveStudent.save(); // Save to DB
    res.status(201).json(saveStudent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route to get all students
pageRouter.get("/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
export default pageRouter;