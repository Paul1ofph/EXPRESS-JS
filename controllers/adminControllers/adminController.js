import Admin from "../../model/adminSchema.js";


// Update a admin by ID
export const updateAdmin = async (req, res) => {
  try {
    const adminIdToUpdate = req.params.id;
    // Ensure non-superAdmins can only update their own profile
    if (req.admin && req.superAdmin) {
      return res.status(403).json({
        message: "Access denied. You can only update your own profile.",
      });
    }
    const admin = await Admin.findByIdAndUpdate(
      adminIdToUpdate,
      req.body,
      { new: true, runValidators: true }
    );
    if (!admin) {
      return res.status(404).json({ message: "admin not found" });
    }
    res.json(admin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a admin by ID
export const deleteAdmin = async (req, res) => {
  try {
    const adminIdToDelete = req.params.id;
    // Ensure non-admins can only delete their own profile
    if (req.admin && req.superAdmin) {
      return res.status(403).json({
        message: "Access denied. You can only delete your own profile.",
      });
    }
    const admin = await Admin.findByIdAndDelete(adminIdToDelete);
    if (!admin) {
      return res.status(404).json({ message: "admin not found" });
    }
    res.json({ message: "admin deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
