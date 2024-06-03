const bcrypt = require("bcrypt");
const { parse } = require("dotenv");
const { tbl_users } = require("../databases/models");
const Op = require("sequelize");

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
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// const createUser = async (req, res, next) => {
//     try {
//         const users = req.body;  // Assuming req.body is an array of user objects

//         // Hash passwords for all users
//         const usersWithHashedPasswords = await Promise.all(users.map(async user => {
//             const hashedPassword = await bcrypt.hash(user.password, 10);
//             return {
//                 ...user,
//                 password: hashedPassword
//             };
//         }));

//         // Perform bulk insert
//         const newUsers = await tbl_users.bulkCreate(usersWithHashedPasswords);

//         res.status(201).json(newUsers);
//     } catch (error) {
//         if (error.name === 'SequelizeUniqueConstraintError') {
//             res.status(400).json({ message: 'One or more emails or phone numbers already exist' });
//         } else {
//             res.status(500).json({ message: error.message });
//         }
//     }
// };

const getAllUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const totalCount = await tbl_users.count();
    const offset = (page - 1) * limit;
    const users = await tbl_users.findAll({
      offset,
      limit,
    });
    const response = {
      total_page: Math.ceil(totalCount / limit),
      current_page: page,
      total_users: totalCount,
      users,
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
      res.status(200).json({ message: "User archived successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
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
      res.status(200).json({ message: "User restored successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const { f_name, l_name, email, phone, password, status, token } = req.body;
    const user = await tbl_users.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Memperbarui data pengguna
    await user.update({
      first_name: f_name,
      last_name: l_name,
      email: email,
      phone_number: phone,
      password: password,
      role: status,
      token: token,
    });

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  deleteUsers,
  restoreUsers,
  updateUser,
};
