var express = require("express");
var router = express.Router();
const {
  uploadRoomImages,
  getGallaries,
  createGallaries,
  updateGallaries,
  deleteGallaries
} = require("../controller/GallariesController");
/* GET users listing. */
// router.get("/", function (req, res, next) {
//   res.send("respond with a resource");
// });

router.post("/upload", createGallaries);
router.get("/:id", getGallaries);
router.put("/:id", updateGallaries);
router.delete("/:id", deleteGallaries);

module.exports = router;
