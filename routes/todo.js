const express = require("express");
const router = express.Router();

const { body } = require("express-validator");

const todo = require("../controllers/todo");
const authCheck = require("../middlewares/auth-check");

router.post("/", authCheck, todo.todoCreate);

module.exports = router;
