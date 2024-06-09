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
var gallariesRouter = require("./routes/gallaries");
var corsOptions = { origin: "http://localhost:3000" };
var app = express();

app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/v1/user", usersRouter);
app.use("/api/v1/reservation", reservationRouter);
app.use("/api/v1/review", reviewRouter);
app.use("/api/v1/upload", gallariesRouter);
module.exports = app;
