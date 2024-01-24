const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = async (req, res, next) => {
  try {
    let JWTToken = "";
    if (req.headers.authorization) {
      JWTToken = req.headers.authorization;
    } else {
      const noTokenError = new Error("Invalid token");
      noTokenError.statusCode = 403;
      throw noTokenError;
    }
    const [tokenType, token] = JWTToken.split(" ");
    if (tokenType == "JWT") {
      await jwt.verify(token, process.env.SECRET_KEY, async (err, decode) => {
        if (err) {
          const invalidTokenError = new Error("Invalid token");
          invalidTokenError.statusCode = 403;
          throw invalidTokenError;
        }
        const user = await User.findOne({
          _id: decode.id,
        });

        if (!user) {
          const err = new Error("User not found");
          err.statusCode = 404;
          throw err;
        }
        req.user = user;
        next();
      });
    } else {
      const err = new Error("Invalid authorization mode");
      err.statusCode = 401;
      throw err;
    }
  } catch (err) {
    if (!res.statusCode) {
      res.statusCode = 500;
    }
    next(err);
  }
};
