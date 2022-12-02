const express = require("express");
const {
  addProject,
  updateProject,
  deleteProject,
  getProject,
  getAllProjects,
  search,
} = require("../controllers/projects");
const verifyToken = require("../verifyToken");

const router = express.Router();

router.post("/", verifyToken, addProject);
router.put("/:id", verifyToken, updateProject);
router.get("/getAll", verifyToken, getAllProjects);
router.get("/getSingle/:id", verifyToken, getProject);
router.delete("/:id", verifyToken, deleteProject);
router.get("/search", verifyToken, search);

module.exports = router;
