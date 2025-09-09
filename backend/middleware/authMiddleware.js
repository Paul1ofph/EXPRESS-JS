import jwt from "jsonwebtoken";
import Student from "../model/users/studentSchema.js";
import Admin from "../model/admin/adminSchema.js";
import SuperAdmin from "../model/superAdmin/superAdminSchema.js";

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Check SuperAdmin first
      const superAdmin = await SuperAdmin.findById(decoded.id).select(
        "-password"
      );
      if (superAdmin) {
        req.superAdmin = superAdmin;
        return next();
      }

      // Then Admin
      const admin = await Admin.findById(decoded.id).select("-password");
      if (admin) {
        req.admin = admin;
        return next();
      }

      // Then Student
      const student = await Student.findById(decoded.id).select("-password");
      if (student) {
        req.student = student;
        return next();
      }

      return res
        .status(401)
        .json({ message: "Not authorized, user not found" });
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  return res.status(401).json({ message: "Not authorized, no token" });
};

export default protect;
