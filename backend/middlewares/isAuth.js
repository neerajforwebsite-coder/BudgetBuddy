const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  try {
    // Get Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(new Error("Not authorized, token missing"));
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    // Verify token using SAME secret used in login
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Save user ID to req object
    req.user = decoded.id;

    next();
  } catch (err) {
    return next(new Error("Token expired, login again"));
  }
};

module.exports = isAuthenticated;
