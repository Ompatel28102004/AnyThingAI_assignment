const Task = require("../models/Task");


function validateTask(data) {
  let errors = [];

  if (!data.title || data.title.trim() === "") {
    errors.push("Title is required");
  }

  return errors;
}

// CREATE TASK
exports.createTask = async (req, res, next) => {
  try {
    const errors = validateTask(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const { title, description } = req.body;

    const task = await Task.create({
      title,
      description,
      user: req.user._id,
    });

    res.status(201).json({ message: "Task created", task });
  } catch (err) {
    next(err);
  }
};


// GET ALL TASKS
exports.getAllTasks = async (req, res, next) => {
  try {
    let filter = { user: req.user._id };

    // admin can see all tasks
    if (req.user.role === "admin") {
      filter = {};
    }

    const tasks = await Task.find(filter)
      .populate("user", "name") 
      .sort({ createdAt: -1 });

    res.json({ tasks });
  } catch (err) {
    next(err);
  }
};



// GET ONE TASK
exports.getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    if (req.user.role !== "admin" && task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    res.json({ task });
  } catch (err) {
    next(err);
  }
};


// UPDATE TASK
exports.updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    if (req.user.role !== "admin" && task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    const { title, description, completed } = req.body;

    if (title !== undefined && title.trim() === "") {
      return res.status(400).json({ message: "Title cannot be empty" });
    }

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (completed !== undefined) task.completed = completed;

    await task.save();

    res.json({ message: "Task updated", task });
  } catch (err) {
    next(err);
  }
};


// DELETE TASK
exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    if (req.user.role !== "admin" && task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await task.deleteOne();

    res.json({ message: "Task deleted" });
  } catch (err) {
    next(err);
  }
};
