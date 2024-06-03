var express = require("express");
var router = express.Router();

const {
  createReview,
  getAllReview,
  archiveReview,
} = require("../controller/ReviewController");

router.get("/review", getAllReview);
router.post("/review", createReview);
router.put("/review", archiveReview);

module.exports = router;
