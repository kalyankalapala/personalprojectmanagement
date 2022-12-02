const createError = require("../error");
const Departments = require("../models/departments");

const addDepartments = async (req, res, next) => {
  const newDepartments = new Departments({userId: req.user.id,...req.body });
  try {
    const savedDepartments = await newDepartments.save();
    res.status(200).json(savedDepartments);
  } catch (error) {
    next(error);
  }
};

const updateDepartment = async (req, res, next) => {
  try {
    const department = await Departments.findById(req.params.id);
    if (!department) return next(createError(404, "Departments not found"));
    if (req.user.id === department.userId) {
      const updatedDepartments = await Departments.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedDepartments);
    } else {
      return next(createError(403, "You can update only your departments"));
    }
  } catch (error) {
    next(error);
  }
};

const deleteDepartment = async (req, res, next) => {
  try {
    const department = await Departments.findById(req.params.id);
    if (!department) return next(createError(404, "Departments not found"));
    if (req.user.id === department.userId) {
      await Departments.findByIdAndDelete(req.params.id);
      res.status(200).json("Department Deleted successfully");
    } else {
      return next(createError(403, "You can delete only your departments"));
    }
  } catch (error) {
    next(error);
  }
};

const getDepartment = async (req, res, next) => {
  try {
    const department = await Departments.findById(req.params.id);
    if (!department) return next(createError(404, "Department not found"));

    res.status(200).json(department);
  } catch (error) {
    next(error);
  }
};
const getAllDepartments = async (req, res, next) => {
  try {
    const departments = await Departments.find({ userId: req.user.id });
    if (!departments) return next(createError(404, "No Department was found"));

    res.status(200).json(departments);
  } catch (error) {
    next(error);
  }
};

const search = async (req, res, next) => {
  const query = req.query.q;

  try {
    const departments = await Departments.find({
      dName: { $regex: query, $options: "i" },
    }).limit(40);
    res.status(200).json(departments);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addDepartments,
  updateDepartment,
  getAllDepartments,
  getDepartment,
  deleteDepartment,
  search,
};
