const createError = require("../error");
const Task = require("../models/tasks");

const addTask = async (req, res, next) => {
  const newTask = new Task({ projectId: req.params.pid, ...req.body });
  try {
    const savedTask = await newTask.save();
    res.status(200).json(savedTask);
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return next(createError(404, "Task not found"));
    
      const updatedTask = await Task.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedTask);
   
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return next(createError(404, "Task not found"));
    
      await Task.findByIdAndDelete(req.params.id);
      res.status(200).json("Task Deleted successfully");
  
  } catch (error) {
    next(error);
  }
};

const getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return next(createError(404, "Task not found"));

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};
const getAllTasks = async (req, res, next) => {
  try {
    const sort = {  endDate: 1 };
    const tasks = await Task.find({ projectId: req.params.pid }).sort(sort);
    if (!tasks) return next(createError(404, "No Task was found"));

    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

const search = async (req, res, next) => {
  const query = req.query.q;

  try {
    const tasks = await Task.find({
      taskName: { $regex: query, $options: "i" },
    }).limit(40);
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addTask,
  updateTask,
  getAllTasks,
  getTask,
  deleteTask,
  search,
};
