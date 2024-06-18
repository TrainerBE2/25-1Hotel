const multer = require("multer");
const upload = require("../config/multer");
const { tbl_gallaries } = require("../databases/models");
const fs = require("fs");
const path = require("path");
const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../utils/responseHandler");

const createGallaries = (req, res) => {
  upload.array("roomImages")(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return sendErrorResponse(res, 500, "Multer error occurred", err.message);
    } else if (err) {
      return sendErrorResponse(res, 500, "Unknown error occurred", err.message);
    }
    try {
      const files = req.files;

      const images = files.map((file) => ({
        room_id: req.body.room_id,
        gal_image: file.filename,
      }));
      const newImages = await tbl_gallaries.bulkCreate(images);
      return sendSuccessResponse(
        res,
        200,
        `${newImages.length} images uploaded successfully`,
        null
      );
    } catch (dbError) {
      req.files.forEach((file) => {
        fs.unlink(
          path.join(
            __dirname,
            "..",
            "public",
            "uploads",
            "rooms",
            file.filename
          ),
          (err) => {
            if (err) {
              console.error(
                `Error removing file ${file.filename}:`,
                err.message
              );
            }
          }
        );
      });
      return sendErrorResponse(res, 500, "Database error", dbError.message);
    }
  });
};

const getGallaries = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await tbl_gallaries.findByPk(id);
    if (!user) {
      sendErrorResponse(res, 404, "Gallaries not found");
    } else {
      sendSuccessResponse(res, 200, "OK", user);
    }
  } catch (error) {
    sendErrorResponse(res, 500, error.message);
  }
};

const updateGallaries = async (req, res, next) => {
  try {
    const gallaries_id = req.params.id; // Mendapatkan ID Room Categories dari parameter rute
    const { room_id, gal_image } = req.body; // Mendapatkan data yang akan diperbarui dari body permintaan

    // Menemukan room categories berdasarkan ID
    const room = await tbl_gallaries.findByPk(gallaries_id);

    // Jika categories tidak ditemukan, kirim respons 404
    if (!room) {
      return res.status(404).json({ message: "Gallaries not found" });
    }

    // Memperbarui room categories
    await room.update({
      room_id: room_id,
      gal_image: gal_image
    });

    res.status(200).json({ message: "Room Categories updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const deleteGallaries = async (req, res, next) => {
  try {
    const gallaries_id = req.params.id; // Getting the gallery ID from the route parameters

    // Finding the gallery item by ID
    const gallery = await tbl_gallaries.findByPk(gallaries_id);

    // If gallery is not found, send a 404 response
    if (!gallery) {
      return res.status(404).json({ message: "Gallary not found" });
    }

    // Deleting the gallery item
    await gallery.destroy();

    res.status(200).json({ message: "Gallery item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// const uploadUserImage = (req, res) => {
//   upload.single("userImages")(req, res, async function (err) {
//     if (err instanceof multer.MulterError) {
//       return sendErrorResponse(res, 500, "Multer error occurred", err.message);
//     } else if (err) {
//       return sendErrorResponse(res, 500, "Unknown error occurred", err.message);
//     }
//     try {
//       const newImage = await tbl_gallaries.create({
//         image_name: req.file.filename,
//       });

//       return res.status(200).json({
//         message: "User image uploaded successfully",
//         filePath: `/uploads/user/${req.file.filename}`,
//         newImage,
//       });
//     } catch (dbError) {
//       return sendErrorResponse(res, 500, "Database error", dbError.message);
//     }
//   });
// };

module.exports = {
  createGallaries,
  getGallaries,
  updateGallaries,
  deleteGallaries
  // uploadUserImage, // Jika Anda mengaktifkan kembali fungsi uploadUserImage
};
