import Student from "../model/studentSchema.js";

// Get all students (Admin-only access)
export const getStudents = async (req, res) => {
  if (req.student.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  try {
    // Exclude passwords from the response
    const students = await Student.find().select("-password");
    res.json(students);
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
    if (
      req.student.role !== "admin" &&
      req.student._id.toString() !== student._id.toString()
    ) {
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
    let studentIdToUpdate = req.params.id;
    // Ensure non-admins can only update their own profile
    if (
      req.student.role !== "admin" &&
      req.student._id.toString() !== studentIdToUpdate
    ) {
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
    let studentIdToDelete = req.params.id;
    // Ensure non-admins can only delete their own profile
    if (
      req.student.role !== "admin" &&
      req.student._id.toString() !== studentIdToDelete
    ) {
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
