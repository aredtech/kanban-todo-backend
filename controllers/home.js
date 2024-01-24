const Todo = require("../models/todo");

exports.getHome = async (req, res, next) => {
  const user = req.user;

  const todos = await Todo.find({
    created_by: user._id,
  }).populate("folder");

  res.status(200).json({
    todos: todos,
  });
};
