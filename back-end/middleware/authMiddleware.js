const jwt = require("jsonwebtoken");
require("dotenv").config;

const authMidlleware = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Acces Denied, no token provided." });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).json({ message: ex.message });
  }
};
module.exports = authMidlleware;
