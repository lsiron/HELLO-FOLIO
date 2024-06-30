const projectService = require('../services/projectService');

const getProject = async (req, res, next) => {
  try {
    const projects = await projectService.getProject(req.user._id);
    res.status(200).json(projects);
  } catch (err) {
    next(err);
  }
};

const createProject = async (req, res, next) => {
  try {
    const newProject = await projectService.createProject(req.user._id, req.body);
    res.status(201).json(newProject);
  } catch (err) {
    next(err);
  }
};

const updateProject = async (req, res, next) => {
  try {
    const updatedProject = await projectService.updateProject(req.params.id, req.body);
    res.status(200).json(updatedProject);
  } catch (err) {
    next(err);
  }
};

const deleteProject = async (req, res, next) => {
  try {
    await projectService.deleteProject(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getProject,
  createProject,
  updateProject,
  deleteProject,
};
