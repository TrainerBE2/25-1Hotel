const { parse } = require("dotenv");
const { tbl_rooms } = require("../databases/models");
const Op = require("sequelize");
const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../utils/responseHandler");

// get all rooms
const getAllRooms = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const totalCount = await tbl_rooms.count();
    const offset = (page - 1) * limit;
    const users = await tbl_rooms.findAll({
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

// create room
const createRooms = async (req, res, next) => {
  try {
    const { room_id, cat_id, name, description, price, status, archived } =
      req.body;
    const newRooms = await tbl_rooms.create({
      room_id: room_id,
      cat_id: cat_id,
      name: name,
      description: description,
      price: price,
      status: status,
      archived: archived,
    });

    res.status(201).json(newRooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update room
const updateRoom = async (req, res, next) => {
  try {
    const room_id = req.params.id; // Mendapatkan ID Room Categories dari parameter rute
    const { name, description, price, status, archived } = req.body; // Mendapatkan data yang akan diperbarui dari body permintaan

    // Menemukan room categories berdasarkan ID
    const room = await tbl_rooms.findByPk(room_id);

    // Jika categories tidak ditemukan, kirim respons 404
    if (!room) {
      return res.status(404).json({ message: "Room Categories not found" });
    }

    // Memperbarui room categories
    await room.update({
      room_id: room_id,
      name: name,
      description: description,
      price: price,
      status: status,
      archived: archived,
    });

    res.status(200).json({ message: "Room Categories updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRoomByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const room = await tbl_rooms.findByPk(id);
    if (!room) {
      return sendErrorResponse(res, 400, "Room not found");
    }
    sendSuccessResponse(res, 200, "OK", room);
  } catch (error) {
    sendErrorResponse(res, 500, error);
  }
};

module.exports = {
  getAllRooms,
  createRooms,
  updateRoom,
  getRoomByID,
};
