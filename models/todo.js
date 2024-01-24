const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = Schema(
  {
    created_by: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    contents: {
      type: [Schema.Types.ObjectId],
      ref: "Content",
    },
    folder: {
      type: Schema.Types.ObjectId,
      ref: "Folder",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Todo", todoSchema);
