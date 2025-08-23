// controllers/authController.js
import Admin from "../model/adminSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Helper function to generate a new JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1h", // Set token expiration
  });
};

// Controller function to handle admin registration
export const registerAdmin = async (req, res) => {
  // Destructure email, password, and now the role from the request body
  const { email, password, role } = req.body;

  // Basic validation
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please enter all required fields" });
  }
  const adminExists = await Admin.findOne({ email });
  if (adminExists) {
    return res.status(400).json({ message: "admin already exists" });
  }

  try {
    // Pass the role to the admin constructor
    const admin = new Admin({ email, password, role });
    await admin.save();

    res.status(201).json({
      _id: admin._id,
      email: admin.email,
      role: admin.role,
      token: generateToken(admin._id),
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller function to handle admin login
export const loginadmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (admin && (await bcrypt.compare(password, admin.password))) {
      res.status(200).json({
        _id: admin._id,
        email: admin.email,
        role: admin.role,
        token: generateToken(admin._id),
      });
    } else {
      res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
