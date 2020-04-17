const Todo = require("../models/todo");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.newTodo = (req, res) => {
  const todo = new Todo({ user: req.profile.name, content: req.body.content });
  todo.save((err, data) => {
    if (err) {
      return res.status(400).json({
        err,
      });
    }
    res.json({ data });
  });
};

exports.getAllTodos = (req, res) => {
  Todo.find({ user: req.profile.name }, (err, data) => {
    if (err) {
      return res.status(400).json({
        err,
      });
    }
    res.json({ data });
  });
};

exports.getId = (req, res, next) => {
  Todo.find({ content: req.body.content }, (err, data) => {
    if (err) {
      return res.status(400).json({
        err,
      });
    }
    req.todo = data._id;
    next();
  });
};

exports.updateStatus = (req, res) => {
  const content = req.body.content;
  Todo.findOne(
    { content: content },

    (err, data) => {
      if (err) {
        return res.status(400).json({
          err,
        });
      }
      const togglecomplete = !data.completed;
      Todo.update(
        { content: content },
        { completed: togglecomplete },
        (err, data) => {
          if (err) {
            return res.status(400).json({
              err,
            });
          }
          res.json(data);
        }
      );
    }
  );
};

exports.deleteTodo = (req, res) => {
  const content = req.body.content;
  Todo.deleteOne({ content: content }, (err, data) => {
    if (err) {
      return res.status(400).json({
        err,
      });
    }
    res.json({ data });
  });
};
