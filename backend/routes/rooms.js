var express = require("express");
var router = express.Router();
const {
  getAllRooms,
  createRooms,
  updateRoom,
  getRoomByID,
} = require("../controller/roomController");

// router.get("/", function (req, res, next) {
//   res.send("nice");
// });

// Define the route to fetch data
router.get("/", getAllRooms);
router.get("/:id", getRoomByID);
router.post("/post", createRooms);
router.put("/edit/:id", updateRoom);

module.exports = router;
