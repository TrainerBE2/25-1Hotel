var express = require("express");
var router = express.Router();
const {
  uploadRoomImages,
  uploadUserImage,
} = require("../controller/GallariesController");
/* GET users listing. */
// router.get("/", function (req, res, next) {
//   res.send("respond with a resource");
// });

router.post("/room", uploadRoomImages);

module.exports = router;
