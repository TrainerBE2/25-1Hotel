var express = require("express");
var router = express.Router();
const {
  getAllRooms,
  createRooms,
  updateRoom,
  getRoomByID,
} = require("../controller/roomController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", getAllRooms);
router.get("/:id", getRoomByID);
router.post("/post", authMiddleware(["admin", "root"]), createRooms);
router.put("/edit/:id", authMiddleware(["admin", "root"]), updateRoom);

module.exports = router;
