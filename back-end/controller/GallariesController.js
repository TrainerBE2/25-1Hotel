const multer = require("multer");
const upload = require("../config/multer");
const { tbl_gallaries } = require("../databases/models");
const fs = require("fs");
const path = require("path");
const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../utils/responseHandler");

const uploadRoomImages = (req, res) => {
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
  uploadRoomImages,
  // uploadUserImage, // Jika Anda mengaktifkan kembali fungsi uploadUserImage
};
