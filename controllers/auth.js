const User = require("../models/user");
const jwt = require("jsonwebtoken");

const { validationResult } = require("express-validator");

const bcrypt = require("bcrypt");

exports.signUp = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed, please pass valid data");
      error.statusCode = 422;
      error.errors = errors.array();
      throw error;
    }

    const { fullName, email, phoneNumber, password, profileImage } = req.body;

    const hashedPassword = await bcrypt.hash(password, 16);

    const userToSave = new User({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
      profileImage,
    });

    await userToSave.save();

    res.status(201).json({
      message: "User created successfully",
      user: userToSave,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed, please pass valid data");
      error.statusCode = 422;
      error.errors = errors.array();
      throw error;
    }

    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    //Check if password is valid
    const isValidPassword = bcrypt.compareSync(password, user.password);

    if (!isValidPassword) {
      return res.status(403).json({
        message: "Invalid credentails provided",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: 1000 * 60 * 60 * 24,
      }
    );

    const userData = {
      fullName: user.fullName,
      email: user.email,
    };
    return res.status(200).json({
      message: "Login successful",
      token: token,
      user: userData,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
