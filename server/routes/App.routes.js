const express = require("express");
const router = express.Router();
const todoController = require("../controllers/App.controller");

// API Routes
router.get("/", todoController.getTodos);
router.post("/", todoController.addTodo);
router.put("/:id", todoController.updateTodo);
router.delete("/:id", todoController.deleteTodo);

module.exports = router;
