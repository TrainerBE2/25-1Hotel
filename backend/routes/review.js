var express = require("express");
var router = express.Router();

const {
  createReview,
  getAllReview,
  archiveReview,
  restoreReview,
  editReview,
  getReviewsByRoomId,
  getReviewsByUserId,
} = require("../controller/ReviewController");
const authMiddleware = require("../middleware/authMiddleware");
const { getRoomByID } = require("../controller/roomController");

router.get("", authMiddleware(["admin", "root"]), getAllReview);
router.post("", authMiddleware(["user"]), createReview);
router.put("/hide", authMiddleware(["admin", "user", "root"]), archiveReview);
router.put(
  "/restore",
  authMiddleware(["admin", "user", "root"]),
  restoreReview
);
router.put("/edit", authMiddleware(["admin", "user", "root"]), editReview);
router.get(
  "/room-user",
  authMiddleware(["admin", "user", "root"]),
  getReviewsByUserId
);
/* Route Public Start */
router.get("/room", getReviewsByRoomId);
/* Route Public End */
module.exports = router;
