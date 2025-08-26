import Admin from "../../model/adminSchema.js";
import Student from "../../model/studentSchema.js";
import SuperAdmin from "../../model/superAdminSchema.js";

// Fetch both students and admins
export const getAllUsers = async (req, res) => {
  try {
    if (!req.superAdmin) {
      return res
        .status(403)
        .json({ message: "Access denied. SuperAdmins only." });
    }

    const students = await Student.find().select("-password");
    const admins = await Admin.find().select("-password");

    res.json({ students, admins });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Fetch only admins
export const getAllAdmins = async (req, res) => {
  try {
    if (!req.superAdmin) {
      return res
        .status(403)
        .json({ message: "Access denied. SuperAdmins only." });
    }

    const admins = await Admin.find().select("-password");
    res.json(admins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch only admins
export const getAllSuperAdmins = async (req, res) => {
  try {
    if (!req.superAdmin) {
      return res
        .status(403)
        .json({ message: "Access denied. SuperAdmins only." });
    }

    const superAdmins = await SuperAdmin.find().select("-password");
    res.json(superAdmins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a superadmin by ID
export const getSuperAdminById = async (req, res) => {
  try {
    const superadmin = await SuperAdmin.findById(req.params.id).select("-password");
    if (!superadmin) {
      return res.status(404).json({ message: "SuperAdmin not found" });
    }
    // Check if the user is not a superadmin
    if (!req.superAdmin) {
      return res.status(403).json({
        message: "Access denied. You can only view your own profile.",
      });
    }
    res.json(superadmin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Update a superadmin by ID
export const updateSuperAdminById = async (req, res) => {
  try {
    const superAdminIdToUpdate = req.params.id;
    // Ensure non-superAdmins can only update their own profile
    if (!req.superAdmin) {
      return res.status(403).json({
        message: "Access denied. You can only update your own profile.",
      });
    }
    const superadmin = await SuperAdmin.findByIdAndUpdate(
      superAdminIdToUpdate,
      req.body,
      { new: true, runValidators: true }
    );
    if (!superadmin) {
      return res.status(404).json({ message: "super admin not found" });
    }
    res.json(superadmin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a admin by ID
export const deleteSuperAdmin = async (req, res) => {
  try {
    const superAdminIdToDelete = req.params.id;
    // Ensure non-admins can only delete their own profile
    if (!req.superAdmin) {
      return res.status(403).json({
        message: "Access denied. You can only delete your own profile.",
      });
    }
    const superadmin = await SuperAdmin.findByIdAndDelete(superAdminIdToDelete);
    if (!superadmin) {
      return res.status(404).json({ message: "super admin not found" });
    }
    res.json({ message: "super admin deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
