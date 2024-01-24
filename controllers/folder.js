const Folder = require("../models/folder");

const { validationResult } = require("express-validator");

exports.folderCreate = async (req, res, next) => {
  try {
    const validationErros = validationResult(req);
    const userId = req.user._id;
    if (!validationErros.isEmpty()) {
      const validationError = new Error("Invalid inputs");
      validationError.statusCode = 422;
      validationError.errors = validationErros.array();
      throw validationError;
    }

    const { folderName } = req.body;

    const folderToCreate = new Folder({
      folderName: folderName,
      created_by: userId,
    });

    await folderToCreate.save();

    res.status(201).json({
      message: "Folder created successfully",
      folder: folderToCreate,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.folderView = async (req, res, next) => {
  try {
    const validationErros = validationResult(req);
    const userId = req.user._id;
    if (!validationErros.isEmpty()) {
      const validationError = new Error("Invalid inputs");
      validationError.statusCode = 422;
      validationError.errors = validationErros.array();
      throw validationError;
    }
    console.log(req);
    const folderId = req.params.folderId;
    const user = req.user;
    const folder = await Folder.findOne({
      folderName: "Personal",
    })
      .populate("todos")
      .exec();

    if (!folder) {
      const notFoundError = new Error("Invalid folder");
      notFoundError.statusCode = 404;
      throw notFoundError;
    }

    res.status(200).json({
      message: "Folder data fetched",
      data: folder,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
