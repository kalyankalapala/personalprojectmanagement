const express = require("express");
const {
  addSubTasks,
  updateSubTasks,
  deleteSubTasks,
  getAllSubTasks,
  getSubTasks,
  search,
  getCompletedSubTasks,
} = require("../controllers/subtasks");
const router = express.Router();

router.post("/:tid", addSubTasks);
router.put("/:id",  updateSubTasks);
router.get("/all/:tid",  getAllSubTasks);
router.get("/:id",  getSubTasks);
router.delete("/:id", deleteSubTasks);
router.get("/search", search);
router.get("/completed/:tid",  getCompletedSubTasks);

module.exports = router;
