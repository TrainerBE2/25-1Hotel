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
      gal_image: gal_image,
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

const deleteImageById = async (req, res) => {
  const { id } = req.query;

  try {
    // Cari gambar berdasarkan ID
    const image = await tbl_gallaries.findByPk(id);

    if (!image) {
      return sendErrorResponse(res, 404, `Image with ID ${id} not found`, null);
    }

    // Hapus gambar dari server
    const imagePath = path.join(
      __dirname,
      "..",
      "public",
      "uploads",
      "rooms",
      image.gal_image
    );
    fs.unlink(imagePath, async (err) => {
      if (err) {
        console.error(`Error removing file ${image.gal_image}:`, err.message);
        return sendErrorResponse(res, 500, "Error removing file", err.message);
      }

      // Hapus record dari database setelah file dihapus dari server
      await image.destroy();

      return sendSuccessResponse(
        res,
        200,
        `Image with ID ${id} deleted successfully`,
        null
      );
    });
  } catch (dbError) {
    return sendErrorResponse(res, 500, "Database error", dbError.message);
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
const updateImageById = async (req, res) => {
  const { id } = req.query; // Menggunakan req.query karena ID mungkin dikirim sebagai parameter query
  try {
    // Cari gambar berdasarkan ID
    let image = await tbl_gallaries.findByPk(id);

    if (!image) {
      return sendErrorResponse(res, 404, `Image with ID ${id} not found`, null);
    }

    // Simpan nama gambar lama
    const oldImageFileName = image.gal_image;

    // Proses unggah file baru menggunakan multer
    upload.single("roomImages")(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return sendErrorResponse(
          res,
          500,
          "Multer error occurred",
          err.message
        );
      } else if (err) {
        return sendErrorResponse(
          res,
          500,
          "Unknown error occurred",
          err.message
        );
      }

      // Jika berhasil diunggah, simpan nama file baru ke database
      if (req.file) {
        image.gal_image = req.file.filename; // Mengganti nama gambar dengan yang baru diunggah
      } else {
        return sendErrorResponse(res, 400, "New image file is required", null);
      }

      // Simpan hanya kolom gal_image yang diperbarui
      await image.save({
        fields: ["gal_image"], // Hanya menyimpan kolom gal_image
      });

      // Hapus file lama jika ada perubahan nama file
      if (oldImageFileName !== image.gal_image) {
        const oldImagePath = path.join(
          __dirname,
          "..",
          "public",
          "uploads",
          "rooms",
          oldImageFileName
        );
        fs.unlink(oldImagePath, (err) => {
          if (err) {
            console.error(
              `Error removing file ${oldImageFileName}:`,
              err.message
            );
          }
        });
      }

      return sendSuccessResponse(
        res,
        200,
        `Image with ID ${id} updated successfully`,
        null
      );
    });
  } catch (dbError) {
    return sendErrorResponse(res, 500, "Database error", dbError.message);
  }
};
const getAllImagesByRoomId = async (req, res) => {
  const { room_id } = req.params;

  try {
    // Cari semua gambar berdasarkan room_id
    const images = await tbl_gallaries.findAll({
      where: {
        room_id: room_id,
      },
    });

    if (!images || images.length === 0) {
      return sendErrorResponse(
        res,
        404,
        `No images found for room with ID ${room_id}`,
        null
      );
    }

    // Siapkan daftar URL gambar untuk dikirim sebagai respons
    const imageUrls = images.map((image) => ({
      id: image.id,
      room_id: image.room_id,
      gal_image: `/uploads/rooms/${image.gal_image}`, // Sesuaikan dengan path sesuai struktur penyimpanan gambar Anda
      createdAt: image.createdAt,
      updatedAt: image.updatedAt,
    }));

    return sendSuccessResponse(
      res,
      200,
      "Images retrieved successfully",
      imageUrls
    );
  } catch (error) {
    return sendErrorResponse(res, 500, "Database error", error.message);
  }
};

module.exports = {
  uploadRoomImages,
  deleteImageById,
  updateImageById,
  getAllImagesByRoomId,
  // uploadUserImage, // Jika Anda mengaktifkan kembali fungsi uploadUserImage
};
