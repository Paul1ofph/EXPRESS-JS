import Student from "../../model/users/studentSchema.js";

// Get users depending on role
export const getStudents = async (req, res) => {
  try {
    if (req.superAdmin) {
      // SuperAdmin: return students
      const students = await Student.find().select("-password");
      return res.json({ students });
    }

    if (req.admin) {
      // Admin: return only students
      const students = await Student.find().select("-password");
      return res.json(students);
    }

    // Otherwise deny
    return res.status(403).json({ message: "Access denied." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Get a student by ID
export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).select("-password");
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    // Check if the user is an admin or is requesting their own profile
    if (req.admin && req.superAdmin && req.student) {
      return res.status(403).json({
        message: "Access denied. You can only view your own profile.",
      });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a student by ID
export const updateStudent = async (req, res) => {
  try {
    const studentIdToUpdate = req.params.id;
    // Ensure non-admins can only update their own profile
    if (req.admin && req.superAdmin && req.student) {
      return res.status(403).json({
        message: "Access denied. You can only update your own profile.",
      });
    }
    const student = await Student.findByIdAndUpdate(
      studentIdToUpdate,
      req.body,
      { new: true, runValidators: true }
    );
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a student by ID
export const deleteStudent = async (req, res) => {
  try {
    const studentIdToDelete = req.params.id;
    // Ensure non-admins can only delete their own profile
    if (req.admin && req.superAdmin && req.student) {
      return res.status(403).json({
        message: "Access denied. You can only delete your own profile.",
      });
    }
    const student = await Student.findByIdAndDelete(studentIdToDelete);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
