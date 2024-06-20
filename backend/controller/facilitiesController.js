const { parse } = require("dotenv");
const { tbl_facilities } = require("../databases/models");
const Op = require("sequelize");

// get all facilities
const getAllFacilities = async (req, res) => {
  try {
    let page = parseInt(req.query.page, 10);
    let limit = parseInt(req.query.limit, 10);

    if (isNaN(page) || page < 1) {
      page = 1; // Default page value
    }

    if (isNaN(limit) || limit < 1) {
      limit = 10; // Default limit value
    }

    const offset = (page - 1) * limit;

    const { count: totalCount, rows: facilityList } =
      await tbl_facilities.findAndCountAll({
        offset,
        limit,
      });

    const response = {
      total_page: Math.ceil(totalCount / limit),
      current_page: page,
      total_facilities: totalCount,
      facility_list: facilityList,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
// create facilities
const createFacilities = async (req, res, next) => {
  try {
    const { cat_id, facilities } = req.body;
    const newFacilities = await tbl_facilities.create({
      cat_id: cat_id,
      facilities: facilities,
    });

    res.status(201).json(newFacilities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update facilities
const updateFacilities = async (req, res, next) => {
  try {
    const facilities_id = req.params.id;
    const { cat_id, facilities } = req.body;
    const room = await tbl_facilities.findByPk(facilities_id);

    if (!room) {
      return res.status(404).json({ message: "Facility not found" });
    }
    await room.update({
      facilities_id: facilities_id,
      cat_id: cat_id,
      facilities: facilities,
    });

    res.status(200).json({ message: "Facility updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllFacilities,
  createFacilities,
  updateFacilities,
};
