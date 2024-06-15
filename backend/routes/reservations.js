var express = require("express");
var router = express.Router();

const {
  createReservation,
  getAllReservations,
  cancelBook,
  getReservationById,
} = require("../controller/ReservationController");

router.get("/book", getAllReservations);
router.post("/book", createReservation);
router.put("/cancelation", cancelBook);
router.get("/search", getReservationById);

module.exports = router;
