var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const db = require("./utils/db");

require("dotenv").config();

const authRouter = require("./routes/auth");
const homeRouter = require("./routes/home");
const folderRouter = require("./routes/folder");
const todoRouter = require("./routes/todo");

var app = express();

db.connectDB();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/auth", authRouter);
app.use("/folder", folderRouter);
app.use("/todo", todoRouter);
app.use("/", homeRouter);

//Error Handler
app.use((err, req, res, next) => {
  if (err.code == 11000) {
    err.message = "Email id already used";
    err.statusCode = 409;
  }
  const errorCode = err.statusCode || 500;
  const message = err.message;
  const errors = err.errors;
  let resp = {
    message: message,
  };
  if (errors) {
    resp["errors"] = errors;
  }
  res.status(errorCode).json(resp);
});

module.exports = app;
