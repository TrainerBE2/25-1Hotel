var express = require("express");
var router = express.Router();

const {
  createReservation,
  getAllReservations,
  cancelBook,
  getReservationById,
  confirmBook,
  getReservationHistory,
} = require("../controller/ReservationController");
const authMiddleware = require("../middleware/authMiddleware");

router.get(
  "/book",
  authMiddleware(["user", "admin", "root"]),
  getAllReservations
);
router.post(
  "/book",
  authMiddleware(["user", "admin", "root"]),
  createReservation
);
router.put(
  "/cancelation",
  authMiddleware(["user", "admin", "root"]),
  cancelBook
);
router.get(
  "/search",
  authMiddleware(["user", "admin", "root"]),
  getReservationById
);
router.put("/confirm", authMiddleware(["user", "admin", "root"]), confirmBook);
router.get(
  "/history",
  authMiddleware(["user", "admin", "root"]),
  getReservationHistory
);

module.exports = router;
