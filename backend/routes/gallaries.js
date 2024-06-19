var express = require("express");
var router = express.Router();
const {
  uploadRoomImages,
  deleteImageById,
  updateImageById,
  getAllImagesByRoomId,
} = require("../controller/GallariesController");
const authMiddleware = require("../middleware/authMiddleware");
router.post("/room", authMiddleware(["root", "admin"]), uploadRoomImages);
router.delete("/room", authMiddleware(["root", "admin"]), deleteImageById);
router.put("/room", authMiddleware(["root", "admin"]), updateImageById);
/* 
Public enpoint
*/
router.get("/room/:room_id", getAllImagesByRoomId);

module.exports = router;
