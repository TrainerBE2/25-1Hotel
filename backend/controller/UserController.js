const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const { parse } = require("dotenv");
const { tbl_users } = require("../databases/models");
const Op = require("sequelize");
const {
  sendSuccessResponse,
  sendErrorResponse,
} = require("../utils/responseHandler");
const { SECRET_KEY } = require("../utils/constant");

const JWT_SECRET = SECRET_KEY;

const createUser = async (req, res, next) => {
  try {
    const { id, f_name, l_name, email, phone, password, status } = req.body;

    // Hash password sebelum menyimpannya ke database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Membuat pengguna baru dalam tabel `tbl_users`
    const newUser = await tbl_users.create({
      user_id: id,
      first_name: f_name,
      last_name: l_name,
      email: email,
      phone_number: phone,
      password: hashedPassword,
      role: status,
    });

    // Mengirim respons sukses
    sendSuccessResponse(res, 201, "User created successfully.");
  } catch (error) {
    // Mengirim respons kesalahan
    sendErrorResponse(res, 500, error.message);
  }
};

// const createUser = async (req, res, next) => {
//   try {
//     const { id, f_name, l_name, email, phone, password, status } = req.body;

//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Generate a verification token
//     const verificationToken = jwt.sign(
//       { email, f_name },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     const newUser = await tbl_users.create({
//       user_id: id,
//       first_name: f_name,
//       last_name: l_name,
//       email: email,
//       phone_number: phone,
//       password: hashedPassword,
//       role: status,
//       token: verificationToken, // Save verification token in database
//     });

//     // Send verification email
//     const verificationUrl = `${req.protocol}://${req.get(
//       "host"
//     )}/api/v1/auth/verify-email?token=${verificationToken}`;

//     await sendVerificationEmail(email, verificationUrl);

//     sendSuccessResponse(
//       res,
//       201,
//       "User created successfully. Please verify your email."
//     );
//   } catch (error) {
//     sendErrorResponse(res, 500, error.message);
//   }
// };

// Function to send verification email
const sendVerificationEmail = async (email, verificationUrl) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // Gmail SMTP server
    port: 465, // Secure SMTP
    secure: true, // true for 465, false for other ports
    auth: {
      user: "yovan211ix5@gmail.com", // Your email address
      pass: "dcqf dkyx giqh vjii", // Your password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verify your email address",
    html: `<p>Please click <a href="${verificationUrl}">here</a> to verify your email address.</p>`,
  };

  await transporter.sendMail(mailOptions);
};

const getAllUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const totalCount = await tbl_users.count();
    const offset = (page - 1) * limit;

    const users = await tbl_users.findAll({
      offset,
      limit,
      order: [["createdAt", "ASC"]],
    });

    const response = {
      total_page: Math.ceil(totalCount / limit),
      current_page: page,
      total_users: totalCount,
      count: users.length,
      users,
    };

    sendSuccessResponse(res, 200, "OK", response);
  } catch (error) {
    sendErrorResponse(res, 500, error.message);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await tbl_users.findByPk(id);
    if (!user) {
      sendErrorResponse(res, 404, "User not found");
    } else {
      sendSuccessResponse(res, 200, "OK", user);
    }
  } catch (error) {
    sendErrorResponse(res, 500, error.message);
  }
};

const deleteUsers = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleteUser = await tbl_users.update(
      { archived: 1 },
      { where: { user_id: id } }
    );
    if (deleteUser[0] === 1) {
      sendSuccessResponse(res, 200, "User archived successfully");
    } else {
      sendErrorResponse(res, 404, "User not found");
    }
  } catch (error) {
    sendErrorResponse(res, 500, error.message);
    /*  */
  }
};

const restoreUsers = async (req, res, next) => {
  try {
    const id = req.params.id;
    const User = await tbl_users.update(
      { archived: 0 },
      { where: { user_id: id } }
    );
    if (User[0] === 1) {
      sendSuccessResponse(res, 200, "User restored successfully");
    } else {
      sendErrorResponse(res, 404, "User not found");
    }
  } catch (error) {
    sendErrorResponse(res, 500, error.message);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const { f_name, l_name, email, phone, password, status, token } = req.body;
    const user = await tbl_users.findByPk(userId);

    if (!user) {
      sendErrorResponse(res, 404, "User not found");
    } else {
      await user.update({
        first_name: f_name,
        last_name: l_name,
        email: email,
        phone_number: phone,
        password: password,
        role: status,
        token: token,
      });
      sendSuccessResponse(res, 200, "User updated successfully");
    }
  } catch (error) {
    sendErrorResponse(res, 500, error.message);
  }
};

const changePass = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const { password } = req.body;
    const user = await tbl_users.findByPk(userId);

    const hashedPassword = await bcrypt.hash(password, 10);

    if (!user) {
      sendErrorResponse(res, 404, "User not found");
    } else {
      await user.update({
        password: hashedPassword,
      });
      sendSuccessResponse(res, 200, "User updated successfully");
    }
  } catch (error) {
    sendErrorResponse(res, 500, error.message);
  }
};

/* 
  Jangan lupa buat fitur foto profil pengguna, model, migrasi, controller
*/

module.exports = {
  createUser,
  getAllUsers,
  deleteUsers,
  restoreUsers,
  updateUser,
  getUserById,
  changePass,
};
