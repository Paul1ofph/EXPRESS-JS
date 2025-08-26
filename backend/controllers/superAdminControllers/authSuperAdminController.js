// controllers/authController.js
import SuperAdmin from "../../model/superAdminSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Helper function to generate a new JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1h", // Set token expiration
  });
};

// Controller function to handle admin registration
export const registerSuperAdmin = async (req, res) => {
  // Destructure email, password, and now the role from the request body
  const { email, password, role } = req.body;

  // Basic validation
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please enter all required fields" });
  }
  const superadminExists = await SuperAdmin.findOne({ email });
  if (superadminExists) {
    return res.status(400).json({ message: "super admin already exists" });
  }

  try {
    // Pass the role to the admin constructor
    const superadmin = new SuperAdmin({ email, password, role });
    await superadmin.save();

    res.status(201).json({
      _id: superadmin._id,
      email: superadmin.email,
      role: superadmin.role,
      token: generateToken(superadmin._id),
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller function to handle superadmin login
export const loginsuperadmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const superadmin = await SuperAdmin.findOne({ email });
    if (superadmin && (await bcrypt.compare(password, superadmin.password))) {
      res.status(200).json({
        token: generateToken(superadmin._id),
        user: {
          _id: superadmin._id,
          email: superadmin.email,
          role: superadmin.role,
        },
      });
    } else {
      res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
