var express = require("express");
var router = express.Router();

const {
  createReview,
  getAllReview,
  archiveReview,
  restoreReview,
  editReview,
  getReviewsByRoomOrUserId,
} = require("../controller/ReviewController");

router.get("", getAllReview);
router.get("/room", getReviewsByRoomOrUserId);
router.post("", createReview);
router.put("/hide", archiveReview);
router.put("/restore", restoreReview);
router.put("/edit", editReview);

module.exports = router;
