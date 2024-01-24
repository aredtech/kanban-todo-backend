const express = require("express");
const router = express.Router();

const { body } = require("express-validator");

const home = require("../controllers/home");
const authCheck = require("../middlewares/auth-check");

router.get("", authCheck, home.getHome);

module.exports = router;
