const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const folderSchema = Schema(
  {
    folderName: {
      type: String,
      required: true,
    },
    created_by: {
      type: Schema.Types.ObjectId,
      required: true,
    },

    todos: {
      type: [Schema.Types.ObjectId],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Folder", folderSchema);
