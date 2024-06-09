const { parse } = require('dotenv');
const { tbl_facilities } = require('../databases/models');
const Op = require('sequelize');

// get all facilities
const getAllFacilities = async (req, res, next) => {
  try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const totalCount = await tbl_facilities.count();
      const offset = (page - 1) * limit;
      const users = await tbl_facilities.findAll({
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

// create facilities
const createFacilities = async (req, res, next) => {
  try{
      const {facilities_id, cat_id, facilities} = req.body;
      const newFacilities = await tbl_facilities.create({
        facilities_id: facilities_id,
        cat_id: cat_id,
        facilities: facilities
      });

      res.status(201).json(newFacilities);
  }catch(error) {
      res.status(500).json({message: error.message})
  }
}

// update facilities
const updateFacilities = async (req, res, next) => {
  try {
      const facilities_id = req.params.id; // Mendapatkan ID Room Categories dari parameter rute
      const { cat_id, facilities } = req.body; // Mendapatkan data yang akan diperbarui dari body permintaan

      // Menemukan room categories berdasarkan ID
      const room = await tbl_facilities.findByPk(facilities_id);

      // Jika categories tidak ditemukan, kirim respons 404
      if (!room) {
          return res.status(404).json({ message: 'Facility not found' });
      }

      // Memperbarui room categories
      await room.update({
        facilities_id: facilities_id,
        cat_id: cat_id,
        facilities: facilities
      });

      res.status(200).json({ message: 'Facility updated successfully' });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllFacilities,
  createFacilities,
  updateFacilities
};