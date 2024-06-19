var express = require("express");
var router = express.Router();
const {
  createUser,
  getAllUsers,
  deleteUsers,
  restoreUsers,
  updateUser,
  getUserById,
  changePass,
} = require("../controller/UserController");
const authMidlleware = require("../middleware/authMiddleware");
/* 
  Root Level
*/
router.get("/", getAllUsers);
router.put("/:id", authMidlleware(["root"]), deleteUsers);
router.put("/:id", authMidlleware(["root"]), restoreUsers);
router.get("/:id", getUserById);
/* 
End Of Root
*/
router.put("/changepass/:id", authMidlleware(["user"]), changePass);

router.post("/register", createUser);
router.put("edit/:id", updateUser);
module.exports = router;
