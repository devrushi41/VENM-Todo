const express = require("express");
const router = express.Router();

const { isAuth, requireSignin } = require("../controllers/auth");
const userById = require("../controllers/user");
const {
  newTodo,
  getAllTodos,
  getId,
  updateStatus,
  deleteTodo,
} = require("../controllers/todo");

router.post("/:userId", requireSignin, isAuth, newTodo);
router.get("/:userId", requireSignin, isAuth, getAllTodos);
router.put("/:userId", requireSignin, isAuth, getId, updateStatus);
router.get("/remove/:userId", requireSignin, isAuth, deleteTodo);

router.param("userId", userById);
module.exports = router;
