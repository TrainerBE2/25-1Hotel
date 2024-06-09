const multer = require("multer");
const upload = require("../config/multer");
const { tbl_gallaries } = require("../databases/models");

const uploadRoomImage = (req, res) => {
  try {
    upload.single("roomImage")(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res
          .status(500)
          .json({ message: "Multer error occurred", error: err.message });
      } else if (err) {
        return res
          .status(500)
          .json({ message: "Unknown error occurred", error: err.message });
      }

      res.status(200).json({
        message: "Room image uploaded successfully",
        filePath: `/uploads/rooms/${req.file.filename}`,
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const uploadUserImage = (req, res) => {
  upload.single("userImage")(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res
        .status(500)
        .json({ message: "Multer error occurred", error: err.message });
    } else if (err) {
      return res
        .status(500)
        .json({ message: "Unknown error occurred", error: err.message });
    }

    res.status(200).json({
      message: "User image uploaded successfully",
      filePath: `/uploads/user/${req.file.filename}`,
    });
  });
};

module.exports = {
  uploadRoomImage,
  uploadUserImage,
};
