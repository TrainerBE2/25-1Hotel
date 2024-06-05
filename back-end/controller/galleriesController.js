const { parse } = require('dotenv');
const { tbl_galleries } = require('../databases/models');
const Op = require('sequelize');

// get all galleries
// const getData = async (req, res) => {
//     try {
//       const [results] = await pool.query('SELECT * FROM tbl_galleries');
//       res.json(results);
//     } catch (error) {
//       console.error('Database query error:', error);
//       res.status(500).json({ error: error.message });
//     }
//   };

  const getAllGalleries = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const totalCount = await tbl_galleries.count();
        const offset = (page - 1) * limit;
        const users = await tbl_galleries.findAll({
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

// create galleries
const createGalleries = async (req, res, next) => {
  try{
      const {galleries_id, room_id, gal_image} = req.body;
      const newRooms = await tbl_galleries.create({
          room_id: room_id,
          galleries_id: galleries_id,
          gal_image: gal_image
      });

      res.status(201).json(newRooms);
  }catch(error) {
      res.status(500).json({message: error.message})
  }
}

// update galleries
const updateGalleries = async (req, res, next) => {
  try {
      const galleries_id = req.params.id; // Mendapatkan ID Room Categories dari parameter rute
      const { room_id, gal_image } = req.body; // Mendapatkan data yang akan diperbarui dari body permintaan

      // Menemukan room categories berdasarkan ID
      const room = await tbl_galleries.findByPk(galleries_id);

      // Jika categories tidak ditemukan, kirim respons 404
      if (!room) {
          return res.status(404).json({ message: 'Gallery not found' });
      }

      // Memperbarui room categories
      await room.update({
        gal_image: gal_image
      });

      res.status(200).json({ message: 'Gallery updated successfully' });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllGalleries,
  createGalleries,
  updateGalleries
};