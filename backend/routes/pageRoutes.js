import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import protect from "../middleware/authMiddleware.js";
import {
  registerStudent,
  loginStudent,
} from "../controllers/studentControllers/authStudentController.js";
import {
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} from "../controllers/studentControllers/myStudentController.js";
import {
  loginadmin,
  registerAdmin,
} from "../controllers/adminControllers/authAdminController.js";
import {
  loginsuperadmin,
  registerSuperAdmin,
} from "../controllers/superAdminControllers/authSuperAdminController.js";
import {
  deleteSuperAdmin,
  getAllAdmins,
  getAllSuperAdmins,
  getAllUsers,
  getSuperAdminById,
  updateSuperAdminById,
} from "../controllers/superAdminControllers/superAdminController.js";
import { deleteAdmin, getAdminById, updateAdmin } from "../controllers/adminControllers/adminController.js";
import { inputProducts } from "../controllers/ProductController/productController.js";

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);
const pageRouter = express.Router();

// Basic route to confirm server is working
pageRouter.get("/", (req, res) => {
  res.sendFile(join(dirName, "../public", "index.html"));
});

// Public authentication routes
pageRouter.post("/register", registerStudent);
pageRouter.post("/login", loginStudent);
// Admin Routes
pageRouter.post("/registeradmin", registerAdmin);
pageRouter.post("/loginadmin", loginadmin);
// Super Admin Routes
pageRouter.post("/registersuperadmin", registerSuperAdmin);
pageRouter.post("/loginsuperadmin", loginsuperadmin);

// Student routes
// Protected routes (middleware is applied)
// Super Admin Routes
pageRouter.get("/allusers", protect, getAllUsers);
pageRouter.get("/admins", protect, getAllAdmins);
pageRouter.get("/superadmins", protect, getAllSuperAdmins);
pageRouter.get("/superadmins/:id", protect, getSuperAdminById);
pageRouter.put("/superadmins/:id", protect, updateSuperAdminById);
pageRouter.delete("/superadmins/:id", protect, deleteSuperAdmin);
// Student Routes
pageRouter.get("/students", protect, getStudents);
pageRouter.get("/students/:id", protect, getStudentById);
pageRouter.put("/students/:id", protect, updateStudent);
pageRouter.delete("/students/:id", protect, deleteStudent);
// Admin routes
pageRouter.get("/admins/:id", protect, getAdminById);
pageRouter.put("/admins/:id", protect, updateAdmin);
pageRouter.delete("/admins/:id", protect, deleteAdmin);

// Products routes
pageRouter.post("/products", protect, inputProducts)


export default pageRouter;
