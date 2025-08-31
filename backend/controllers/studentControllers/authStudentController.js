// controllers/authController.js
import Student from "../../model/studentSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Helper function to generate a new JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1h", // Set token expiration
  });
};

// Controller function to handle student registration
export const registerStudent = async (req, res) => {
  // Destructure email, password, and now the role from the request body
  const { email, password, role } = req.body;

  // Basic validation
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please enter all required fields" });
  }
  const studentExists = await Student.findOne({ email });
  if (studentExists) {
    return res.status(400).json({ message: "Student already exists" });
  }

  try {
    // Pass the role to the Student constructor
    const student = new Student({ email, password, role });
    await student.save();

    res.status(201).json({
      token: generateToken(student._id),
      user: {
        _id: student._id,
        email: student.email,
        role: student.role,
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller function to handle student login
export const loginStudent = async (req, res) => {
  const { email, password } = req.body;
  try {
    const student = await Student.findOne({ email });
    if (student && (await bcrypt.compare(password, student.password))) {
      res.status(200).json({
        token: generateToken(student._id),
        user: {
          _id: student._id,
          email: student.email,
          role: student.role,
        },
      });
    } else {
      res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
