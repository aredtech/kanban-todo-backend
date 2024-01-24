const express = require("express");
const router = express.Router();

const { body } = require("express-validator");

const auth = require("../controllers/auth");

/* POST sign up */
router.post(
  "/signup",
  [
    body("password").trim().notEmpty(),
    body("email")
      .trim()
      .isEmail()
      .withMessage("Please enter valid email address")
      .notEmpty()
      .withMessage("Email id is required"),
    body("fullName").trim().notEmpty().withMessage("Full name is required"),
  ],
  auth.signUp
);

/* POST login up */
router.post(
  "/login",
  [
    body("email")
      .trim()
      .isEmail()
      .withMessage("Please enter valid email address")
      .notEmpty()
      .withMessage("Email id is required"),
    body("password").trim().notEmpty().withMessage("Password is required"),
  ],
  auth.login
);

module.exports = router;
