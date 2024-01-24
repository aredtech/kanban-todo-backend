const express = require("express");
const router = express.Router();

const { body } = require("express-validator");

const folder = require("../controllers/folder");
const authCheck = require("../middlewares/auth-check");

router.post(
  "/",
  [
    authCheck,
    body("folderName")
      .trim()
      .isString()
      .notEmpty()
      .withMessage("Enter folder name"),
  ],
  folder.folderCreate
);

router.get("/", [authCheck], folder.folderView);
module.exports = router;
