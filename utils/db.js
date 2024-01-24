const mongoose = require("mongoose");

exports.connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(console.log("Connected to DB"))
    .catch((err) => {
      console.log(err);
    });
};
