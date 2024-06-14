const jwt = require("jsonwebtoken");
const { sendErrorResponse } = require("../utils/responseHandler");
require("dotenv").config();

const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    const authHeader = req.header("Authorization");

    // Check if Authorization header is present
    if (!authHeader) {
      return sendErrorResponse(res, 401, "Access denied. No token provided.");
    }

    const token = authHeader.replace("Bearer ", "");

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      // Check if the user's role is in the allowed roles
      if (roles.length && !roles.includes(req.user.role)) {
        return sendErrorResponse(
          res,
          403,
          "Access denied. Insufficient permissions."
        );
      }

      next();
    } catch (error) {
      return sendErrorResponse(res, 400, "Invalid token.");
    }
  };
};

module.exports = authMiddleware;
