const createError = require("../error");
const SubTasks = require("../models/subtasks");

const addSubTasks = async (req, res, next) => {
  const newSubTasks = new SubTasks({ taskId: req.params.tid, ...req.body });
  try {
    const savedSubTasks = await newSubTasks.save();
    res.status(200).json(savedSubTasks);
  } catch (error) {
    next(error);
  }
};

const updateSubTasks = async (req, res, next) => {
  try {
    const subTasks = await SubTasks.findById(req.params.id);
    if (!subTasks) return next(createError(404, "SubTasks not found"));

    const updatedSubTasks = await SubTasks.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedSubTasks);
  } catch (error) {
    next(error);
  }
};

const deleteSubTasks = async (req, res, next) => {
  try {
    const subtask = await SubTasks.findById(req.params.id);
    if (!subtask) return next(createError(404, "Task not found"));

    await SubTasks.findByIdAndDelete(req.params.id);
    res.status(200).json("Task Deleted successfully");
  } catch (error) {
    next(error);
  }
};

const getSubTasks = async (req, res, next) => {
  try {
    const sort = {  author: 1 };
    const SubTasks = await SubTasks.findById(req.params.id);
    if (!SubTasks) return next(createError(404, "Task not found"));

    res.status(200).json(SubTasks);
  } catch (error) {
    next(error);
  }
};
const getCompletedSubTasks = async (req, res, next) => {
  try {
    const subTask = await SubTasks.find({
      taskId: req.params.tid,
      status: "completed",
    });
    if (!subTask) return next(createError(404, "SubTask not found"));

    res.status(200).json(subTask);
  } catch (error) {
    next(error);
  }
};
const getAllSubTasks = async (req, res, next) => {
  try {
    const subTasks = await SubTasks.find({ taskId: req.params.tid });
    if (!subTasks) return next(createError(404, "No Task was found"));

    res.status(200).json(subTasks);
  } catch (error) {
    next(error);
  }
};

const search = async (req, res, next) => {
  const query = req.query.q;
  console.log(query);
  try {
    const subTasks = await SubTasks.find({
      subtaskTitle: { $regex: query, $options: "i" },
    }).limit(40);
    res.status(200).json(subTasks);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addSubTasks,
  updateSubTasks,
  getAllSubTasks,
  getSubTasks,
  deleteSubTasks,
  search,
  getCompletedSubTasks,
};
