require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const { sequelize } = require("./databases/models");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var reservationRouter = require("./routes/reservations");
var reviewRouter = require("./routes/review");
var roomsRouter = require("./routes/rooms");
var facilitiesRouter = require("./routes/facilities");
var roomscatRouter = require("./routes/roomscat");
var gallariesRouter = require("./routes/gallaries");
var { keyGenerator, secretKey, secretKey } = require("./utils/helper");
const authRoutes = require("./routes/auth");
const authMiddleware = require("./middleware/authMiddleware");

var corsOptions = { origin: "http://localhost:3000" }; // Sesuaikan dengan frontend Anda

var app = express();

app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/v1/users", authMiddleware, usersRouter);
app.use("/api/v1/reservation", reservationRouter);
app.use("/api/v1/review", authMiddleware, reviewRouter);
app.use("/api/v1/rooms", roomsRouter);
app.use("/api/v1/facilities", facilitiesRouter);
app.use("/api/v1/roomscat", roomscatRouter);
app.use("/api/v1/gallaries", gallariesRouter);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/key-secret", (req, res) => {
  const secretKey = keyGenerator();
  res.json({ secretKey });
});
app.use("/api/v1/JWT", (req, res) => {
  const secretKey = secretKey();
  res.json({ secretKey });
});

// Mulai koneksi ke database
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = app;
