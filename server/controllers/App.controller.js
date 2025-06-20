const Todo = require("../models/User.model");

// Lấy tất cả todos
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Thêm mới todo
exports.addTodo = async (req, res) => {
  const { title, description, dueDate, isCompleted } = req.body;

  const newTodo = new Todo({
    title,
    description,
    dueDate,
    isCompleted,
  });

  try {
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Cập nhật todo
exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, description, dueDate, isCompleted } = req.body;

  try {
    const parsedDueDate = new Date(dueDate);
    if (isNaN(parsedDueDate)) {
      return res.status(400).json({ message: "Invalid dueDate format" });
    }

    // Cập nhật Todo theo ID
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { title, description, dueDate: parsedDueDate, isCompleted },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json(updatedTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update Todo" });
  }
};

// Xóa todo
exports.deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
