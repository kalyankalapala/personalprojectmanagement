const createError = require("../error");
const Employees = require("../models/employees");

const addEmployees = async (req, res, next) => {
  const newEmployees = new Employees({depId: req.params.dId,...req.body });
  try {
    const savedEmployees = await newEmployees.save();
    res.status(200).json(savedEmployees);
  } catch (error) {
    next(error);
  }
};

const updateEmployee = async (req, res, next) => {
  try {
    const employee = await Employees.findById(req.params.id);
    if (!employee) return next(createError(404, "Employee not found"));
   
      const updatedEmployees = await Employees.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedEmployees);

  } catch (error) {
    next(error);
  }
};

const deleteEmployee = async (req, res, next) => {
  try {
    const employee = await Employees.findById(req.params.id);
    if (!employee) return next(createError(404, "Employees not found"));
  
      await Employees.findByIdAndDelete(req.params.id);
      res.status(200).json("Employee Deleted successfully");

  } catch (error) {
    next(error);
  }
};

const getEmployee = async (req, res, next) => {
  try {
    const employee = await Employees.findById(req.params.id);
    if (!employee) return next(createError(404, "Employee not found"));

    res.status(200).json(employee);
  } catch (error) {
    next(error);
  }
};
const getAllEmployees = async (req, res, next) => {
  try {
    const employee = await Employees.find({ depId: req.params.dId });
    if (!employee) return next(createError(404, "No Employee was found"));

    res.status(200).json(employee);
  } catch (error) {
    next(error);
  }
};

const search = async (req, res, next) => {
  const query = req.query.q;

  try {
    const employees = await Employees.find({
      empName: { $regex: query, $options: "i" },
    }).limit(40);
    res.status(200).json(employees);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addEmployees,
  updateEmployee,
  getAllEmployees,
  getEmployee,
  deleteEmployee,
  search,
};
