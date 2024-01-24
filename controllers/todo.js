const Folder = require("../models/folder");
const Content = require("../models/content");
const Todo = require("../models/todo");
const contentSort = require("../utils/content-extract");

const { validationResult } = require("express-validator");

exports.todoCreate = async (req, res, next) => {
  try {
    const user = req.user;
    const validationErros = validationResult(req);
    if (!validationErros.isEmpty()) {
      const validationError = new Error("Invalid inputs");
      validationError.statusCode = 422;
      validationError.errors = validationErros.array();
      throw validationError;
    }
    const folderId = req.body.folderId;
    let folder;
    if (folderId) {
      folder = await Folder.findOne({
        _id: folderId,
      });

      if (!folder) {
        const invalidFolder = new Error("Invalid folder");
        invalidFolder.statusCode = 404;
        throw invalidFolder;
      }
    }

    let todoData = {
      created_by: user._id,
    };

    if (folder) {
      todoData["folder"] = folder._id;
    }

    const todoToSave = new Todo(todoData);
    await todoToSave.save();

    if (folder) {
      folder.todos.push(todoToSave._id);
      await folder.save();
    }

    user.todos.push(todoToSave._id);
    await user.save();

    res.status(201).json({
      message: "Todo saved",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
