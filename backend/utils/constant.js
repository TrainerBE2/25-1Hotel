const PENDING_PAYMENT = "Pending";
const PAID = "Paid";
const CANCELED = "Failed";
const BOOKED = "Booked";
const AVAILABLE = "Available";
const OCCUPIED = "Occupied";
const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY;
const MIDTRANS_APP_URL = process.env.MIDTRANS_APP_URL;
const MIDTRANS_API_URL = process.env.MIDTRANS_API_URL;
const SECRET_KEY = process.env.SECRET_KEY;
const FRONT_END_URL = "";

module.exports = {
  PENDING_PAYMENT,
  PAID,
  CANCELED,
  BOOKED,
  AVAILABLE,
  OCCUPIED,
  MIDTRANS_SERVER_KEY,
  MIDTRANS_APP_URL,
  MIDTRANS_API_URL,
  FRONT_END_URL,
  SECRET_KEY,
};
