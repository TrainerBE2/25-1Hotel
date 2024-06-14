const bcrypt = require("bcrypt");
const { parse } = require("dotenv");
const { tbl_users } = require("../databases/models");
const Op = require("sequelize");
const {
  sendSuccessResponse,
  sendErrorResponse,
} = require("../utils/responseHandler");

const createUser = async (req, res, next) => {
  try {
    const { id, f_name, l_name, email, phone, password, status, token } =
      req.body;
    const newUser = await tbl_users.create({
      user_id: id,
      first_name: f_name,
      last_name: l_name,
      email: email,
      phone_number: phone,
      password: password,
      role: status,
      token: token,
    });
    sendSuccessResponse(res, 201, "User created successfully", newUser);
  } catch (error) {
    sendErrorResponse(res, 500, error.message);
  }
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
};
