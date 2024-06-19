var express = require("express");
var router = express.Router();
const {
  getAllRoomsCat,
  createRoomsCat,
  updateRoomsCat,
} = require("../controller/roomscatController");

// router.get('/', function(req, res, next) {
//   res.send('nice');
// });

// Define the route to fetch data
router.get("/", getAllRoomsCat);
router.post("/post", createRoomsCat);
router.put("/edit/:id", updateRoomsCat);
// router.get('/get/:id', getDataId);

module.exports = router;
