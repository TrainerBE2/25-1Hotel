const { parse } = require("dotenv");
const { tbl_rooms_categories } = require("../databases/models");
const Op = require("sequelize");

const getAllRoomsCat = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const totalCount = await tbl_rooms_categories.count();
    const offset = (page - 1) * limit;
    const data = await tbl_rooms_categories.findAll({
      offset,
      limit,
    });
    const response = {
      total_page: Math.ceil(totalCount / limit),
      current_page: page,
      total_users: totalCount,
      data,
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createRoomsCat = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const newRoomsCat = await tbl_rooms_categories.create({
      name: name,
      description: description,
    });

    res.status(201).json(newRoomsCat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateRoomsCat = async (req, res, next) => {
  try {
    const cat_id = req.params.id;
    const { name, description } = req.body;
    const room = await tbl_rooms_categories.findByPk(cat_id);
    if (!room) {
      return res.status(404).json({ message: "Room Categories not found" });
    }

    await room.update({
      name: name,
      description: description,
    });

    res.status(200).json({ message: "Room Categories updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllRoomsCat,
  createRoomsCat,
  updateRoomsCat,
};
