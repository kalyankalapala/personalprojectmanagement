const express = require("express");
const {
  addDepartments,
  updateDepartment,
  deleteDepartment,
  getDepartment,
  getAllDepartments,
  search,
} = require("../controllers/departments");
const verifyToken = require("../verifyToken");

const router = express.Router();

router.post("/", verifyToken, addDepartments);
router.put("/:id", verifyToken, updateDepartment);
router.get("/getAll", verifyToken, getAllDepartments);
router.get("/getSingle/:id", getDepartment);
router.delete("/:id", verifyToken, deleteDepartment);
router.get("/search", verifyToken, search);

module.exports = router;
