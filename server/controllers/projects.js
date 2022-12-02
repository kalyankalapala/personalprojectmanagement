const createError = require("../error");
const Project = require("../models/projects");

const addProject = async (req, res, next) => {
  const newProject = new Project({ userId: req.user.id, ...req.body });
  try {
    const savedProject = await newProject.save();
    res.status(200).json(savedProject);
  } catch (error) {
    next(error);
  }
};

const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return next(createError(404, "Project not found"));
    if (req.user.id === project.userId) {
      const updatedProject = await Project.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedProject);
    } else {
      return next(createError(403, "You can update only your project"));
    }
  } catch (error) {
    next(error);
  }
};

const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return next(createError(404, "Project not found"));
    if (req.user.id === project.userId) {
      await Project.findByIdAndDelete(req.params.id);
      res.status(200).json("Project Deleted successfully");
    } else {
      return next(createError(403, "You can delete only your projects"));
    }
  } catch (error) {
    next(error);
  }
};

const getProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return next(createError(404, "Project not found"));

    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
};
const getAllProjects = async (req, res, next) => {
  try {
    const project = await Project.find({ userId: req.user.id });
    if (!project) return next(createError(404, "No Project was found"));

    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
};

const search = async (req, res, next) => {
  const query = req.query.q;

  try {
    const projects = await Project.find({
      projectName: { $regex: query, $options: "i" },
    }).limit(40);
    res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addProject,
  updateProject,
  getAllProjects,
  getProject,
  deleteProject,
  search,
};
