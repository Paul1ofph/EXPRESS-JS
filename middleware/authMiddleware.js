import jwt from "jsonwebtoken";
import Student from "../model/studentSchema.js";

// Middleware to protect routes from unauthenticated access
const protect = async (req, res, next) => {
  let token;

  // Check if the 'Authorization' header exists and starts with 'Bearer'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract the token from the "Bearer <token>" string
      token = req.headers.authorization.split(" ")[1];

      // Verify the token using the secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the student by the ID from the decoded token and attach it to the request
      req.student = await Student.findById(decoded.id).select("-password");

      // Call the next middleware or route handler
      next();
    } catch (error) {
      // If verification fails, stop the execution by returning the response
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    // If no token is provided in the header, stop the execution and send a 401 Unauthorized response
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

export default protect;