const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { tbl_users, Sequelize } = require("../databases/models");
const { Op } = Sequelize;
require("dotenv").config();
const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../utils/responseHandler");

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await tbl_users.findOne({
      where: {
        email: {
          [Op.iLike]: email, // Case-insensitive search
        },
      },
    });
    if (userExists) {
      return sendErrorResponse(res, 400, "User already registered.");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save user
    const newUser = await tbl_users.create({
      username,
      email,
      password: hashedPassword,
    });

    return sendSuccessResponse(res, 201, "User registered successfully.", {
      user: newUser,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    return sendErrorResponse(res, 500, "Server error", error.message);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user
    const user = await tbl_users.findOne({
      where: {
        email: {
          [Op.like]: email, // Use Op.iLike for case-insensitive search
        },
      },
    });
    if (!user) {
      return sendErrorResponse(res, 400, "Invalid email or password.");
    }

    // Validate password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return sendErrorResponse(res, 400, "Invalid email or password.");
    }

    // Generate token
    const token = jwt.sign(
      { id: user.user_id, name: user.first_name, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRATION,
      }
    );

    return sendSuccessResponse(res, 200, "Login successful.", {
      token,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.error("Error during login:", error);
    return sendErrorResponse(res, 500, "Server error", error.message);
  }
};

module.exports = {
  register,
  login,
};
