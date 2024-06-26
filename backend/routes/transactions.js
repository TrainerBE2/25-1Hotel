var express = require("express");
const {
  handlePaymentNotification,
  handleSuccess,
  handleFailed,
} = require("../controller/TransactionController");
var router = express.Router();

// Define the route to fetch data
router.post("/result", handlePaymentNotification);
router.get("/succes", handleSuccess);
router.get("/failed", handleFailed);
// router.get('/get/:id', getDataId);

module.exports = router;
