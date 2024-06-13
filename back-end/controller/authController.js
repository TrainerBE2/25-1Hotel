const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { tbl_users, Sequelize } = require("../databases/models");
const { Op } = Sequelize;
require("dotenv").config();

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
      return res.status(400).json({ message: "User already registered." });
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
    res
      .status(201)
      .json({ message: "User registered successfully.", user: newUser });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Server error", error: error.message });
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
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Validate password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Generate token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRATION,
      }
    );

    res.json({
      status: 200,
      token,
      user: {
        id: user.user_id,
        email: user.email,
        role: user.role,
        JWT: process.env.JWT_SECRET,
        // Note: For security reasons, you should never include the password in the response.
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  register,
  login,
};
