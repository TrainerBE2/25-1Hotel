var express = require("express");
var router = express.Router();
const {
  uploadRoomImage,
  uploadUserImage,
} = require("../controller/GallariesController");
/* GET users listing. */
// router.get("/", function (req, res, next) {
//   res.send("respond with a resource");
// });

router.post("/room", uploadRoomImage);
router.post("/user", uploadRoomImage);

module.exports = router;
