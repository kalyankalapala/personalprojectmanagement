const express = require("express");
const {
  addTask,
  updateTask,
  deleteTask,
  getTask,
  getAllTasks,
  search,
} = require("../controllers/tasks");

const router = express.Router();

router.post("/:pid",  addTask);
router.put("/:id" , updateTask);
router.get("/getAll/:pid", getAllTasks);
router.get("/getSingle/:id",  getTask);
router.delete("/:id", deleteTask);
router.get("/search", search);

module.exports = router;
