const express = require("express");
const {
  addEmployees,
  updateEmployee,
  deleteEmployee,
  getEmployee,
  getAllEmployees,
  search,
} = require("../controllers/employees");

const router = express.Router();

router.post("/:dId",  addEmployees);
router.put("/:id" , updateEmployee);
router.get("/getAll/:dId", getAllEmployees);
router.get("/getSingle/:id",  getEmployee);
router.delete("/:id", deleteEmployee);
router.get("/search", search);

module.exports = router;
