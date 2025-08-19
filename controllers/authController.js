import Student from "../model/studentSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Generate a JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

// Register a new student
export const registerStudent = async (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please enter all required fields" });
  }

  // Check if student already exists
  const studentExists = await Student.findOne({ email });
  if (studentExists) {
    return res.status(400).json({ message: "Student already exists" });
  }

  try {
    const student = new Student({ email, password });
    await student.save();

    res.status(201).json({
      _id: student._id,
      email: student.email,
      role: student.role,
      // Generate a token for the new user
      token: generateToken(student._id),
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Log in a student
export const loginStudent = async (req, res) => {
  const { email, password } = req.body;

  try {
    const student = await Student.findOne({ email });
    // Check if user exists and if the provided password matches the hashed password
    if (student && (await bcrypt.compare(password, student.password))) {
      res.status(200).json({
        _id: student._id,
        email: student.email,
        role: student.role,
        // Generate a token for the logged-in user
        token: generateToken(student._id),
      });
    } else {
      res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
