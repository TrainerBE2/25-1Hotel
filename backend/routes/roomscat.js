var express = require("express");
var router = express.Router();
const {
  getAllRoomsCat,
  createRoomsCat,
  updateRoomsCat,
} = require("../controller/roomscatController");
const authMiddleware = require("../middleware/authMiddleware");

// router.get('/', function(req, res, next) {
//   res.send('nice');
// });

// Define the route to fetch data
router.get("/", getAllRoomsCat);
router.post("/post", authMiddleware(["admin", "root"]), createRoomsCat);
router.put("/edit/:id", authMiddleware(["admin", "root"]), updateRoomsCat);
// router.get('/get/:id', getDataId);

module.exports = router;
