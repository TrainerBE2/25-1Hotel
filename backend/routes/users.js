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
const authMidlleware = require("../middleware/authMiddleware");
/* 
  Root Level
*/
router.get("/", authMidlleware(["root"]), getAllUsers);
router.put("/:id", authMidlleware(["root"]), deleteUsers);
router.put("/:id", authMidlleware(["root"]), restoreUsers);
/* 
End Of Root
*/
router.get("/:id", getUserById);
router.post("/register", createUser);
router.put("edit/:id", updateUser);
module.exports = router;
