var express = require("express");
var router = express.Router();

const {
  createReview,
  getAllReview,
} = require("../controller/ReviewController");

router.get("/review", getAllReview);
router.post("/review", createReview);

module.exports = router;
