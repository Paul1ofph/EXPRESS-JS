import mongoose from "mongoose";

// Define the blueprint of a Student document
const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // Validation: must have a name
      required: true, 
    },
    age: {
      type: Number,
      // Validation: must be positive
      min: 1, 
    },
    course: {
      type: String,
      // Default if no course provided
      default: "Node.js", 
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
  },
  // Auto adds createdAt & updatedAt
  { timestamps: true }
); 

// Create the model (students collection)
const Student = mongoose.model("Student", studentSchema);

export default Student;
