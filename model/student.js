import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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
    password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 8,
  },
  },
  // Auto adds createdAt & updatedAt
  { timestamps: true }
); 
// Hash the password before saving the student document
studentSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});
// Create the model (students collection)
const Student = mongoose.model("Student", studentSchema);

export default Student;
