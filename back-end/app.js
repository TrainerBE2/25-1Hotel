require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const { sequelize } = require("./databases/models");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var reservationRouter = require("./routes/reservations");
var reviewRouter = require("./routes/review");
var roomsRouter = require('./routes/rooms');
var galleriesRouter = require('./routes/galleries');
var facilitiesRouter = require('./routes/facilities');
var roomscatRouter = require('./routes/roomscat');

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/v1", usersRouter);
app.use("/api/v1", reservationRouter);
app.use("/api/v1", reviewRouter);
app.use('/rooms', roomsRouter);
app.use('/galleries', galleriesRouter);
app.use('/facilities', facilitiesRouter);
app.use('/roomscat', roomscatRouter);

module.exports = app;
