var express = require("express");
var router = express.Router();
const {
  createUser,
  getAllUsers,
  deleteUsers,
  restoreUsers,
  updateUser,
  getUserById,
} = require("../controller/UserController");
/* GET users listing. */
// router.get("/", function (req, res, next) {
//   res.send("respond with a resource");
// });

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", deleteUsers);
router.put("/:id", restoreUsers);
router.put("edit/:id", updateUser);
module.exports = router;
