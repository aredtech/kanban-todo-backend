const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
    },

    profileImage: {
      type: String,
    },
    todos: {
      type: [Schema.Types.ObjectId],
      ref: "Todo",
    },
    folders: {
      type: [Schema.Types.ObjectId],
      ref: "Folder",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
