import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Define the blueprint of a Admin Information
const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      // Regex to validate the email format
      match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 8,
    },
    role: {
      type: String,
      enum: ["student", "admin", "superadmin"],
      default: "admin",
    },
  },
  // adds createdAt & updatedAt
  { timestamps: true }
);

// Hash the password before saving the user information
// Middleware (hook) that runs before a document is saved
adminSchema.pre("save", async function (next) {
  // Check if the password has been modified to prevent re-hashing
  if (this.isModified("password")) {
    // Generate a salt with 10 rounds
    const salt = await bcrypt.genSalt(10);
    // Hash the password
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Create the model (students collection)
const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
