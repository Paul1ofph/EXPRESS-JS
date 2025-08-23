import Admin from "../model/adminSchema.js";
import Student from "../model/studentSchema.js";

// Fetch both students and admins
export const getAllUsers = async (req, res) => {
  try {
    if (!req.superAdmin) {
      return res.status(403).json({ message: "Access denied. SuperAdmins only." });
    }

    const students = await Student.find().select("-password");
    const admins = await Admin.find().select("-password");

    res.json({ students, admins });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch only students
export const getAllStudents = async (req, res) => {
  try {
    if (!req.superAdmin) {
      return res.status(403).json({ message: "Access denied. SuperAdmins only." });
    }

    const students = await Student.find().select("-password");
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch only admins
export const getAllAdmins = async (req, res) => {
  try {
    if (!req.superAdmin) {
      return res.status(403).json({ message: "Access denied. SuperAdmins only." });
    }

    const admins = await Admin.find().select("-password");
    res.json(admins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
