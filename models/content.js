const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contentSchema = Schema(
  {
    created_by: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    type: {
      type: String,
      enum: ["TEXT", "ATTACHMENT", "HEADER"],
      default: "TEXT",
    },
    todo: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    content: {
      type: String,
    },
    contentStatus: {
      type: Boolean,
      default: truegi,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Content", contentSchema);
