const { parse } = require('dotenv');
const { tbl_rooms_categories } = require('../databases/models');
const Op = require('sequelize');

// get all rooms
const getAllRoomsCat = async (req, res, next) => {
  try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const totalCount = await tbl_rooms_categories.count();
      const offset = (page - 1) * limit;
      const users = await tbl_rooms_categories.findAll({
          offset,
          limit
      });
      const response = {
          total_page: Math.ceil(totalCount / limit),
          current_page: page,
          total_users: totalCount,
          users
      }
      res.status(200).json(response)
  } catch (error) {
      res.status(500).json({message: error.message})
  }
}

// //get room by id
// const getDataId = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const [rows] = await pool.query('SELECT * FROM tbl_rooms_categories WHERE cat_id = ?', [id]);
//     if (rows.length === 0) {
//       return res.status(404).json({ message: 'Room not found' });
//     }

//     res.status(200).json(rows[0]);
//   } catch (error) {
//     console.error('Database query error:', error);
//     res.status(500).json({ error: error.message });
//   }
// };

// // create room categories
const createRoomsCat = async (req, res, next) => {
  try{
      const {cat_id, name, description} = req.body;
      const newRoomsCat = await tbl_rooms_categories.create({
          cat_id: cat_id,
          name: name,
          description: description
      });

      res.status(201).json(newRoomsCat);
  }catch(error) {
      res.status(500).json({message: error.message})
  }
}

// update room
const updateRoomsCat = async (req, res, next) => {
  try {
      const cat_id = req.params.id; // Mendapatkan ID Room Categories dari parameter rute
      const { name, description } = req.body; // Mendapatkan data yang akan diperbarui dari body permintaan

      // Menemukan room categories berdasarkan ID
      const room = await tbl_rooms_categories.findByPk(cat_id);

      // Jika categories tidak ditemukan, kirim respons 404
      if (!room) {
          return res.status(404).json({ message: 'Room Categories not found' });
      }

      // Memperbarui room categories
      await room.update({
          name: name,
          description: description
      });

      res.status(200).json({ message: 'Room Categories updated successfully' });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};


module.exports = {
  getAllRoomsCat,
  createRoomsCat,
  updateRoomsCat
  // updateRoom
};