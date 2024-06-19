var express = require("express");
var router = express.Router();
const {
  getAllFacilities,
  createFacilities,
  updateFacilities,
} = require("../controller/facilitiesController");
const authMiddleware = require("../middleware/authMiddleware");
// router.get('/', function(req, res, next) {
//   res.send('nice');
// });

// Define the route to fetch data
router.get("/get", getAllFacilities);
router.post("/post", authMiddleware(["admin", "root"]), createFacilities);
router.put("/edit/:id", authMiddleware(["admin", "root"]), updateFacilities);

module.exports = router;
