const ProjectModel = require('../db/model/projectModel');
const ServiceError = require('../errors/serviceError');
const ConflictError = require('../errors/conflictError');

const getProject = async (userId) => {
    return await ProjectModel.find({ userId });
}

const createProject = async (userId, projectData) => {
  const existingProject = await ProjectModel.findOne({
    userId,
    title: projectData.title,
    content: projectData.content,
    role: projectData.role,
    startDate: projectData.startDate
  });

  if (existingProject) {
    throw new ConflictError('같은 이름의 프로젝트가 등록되어 있습니다.', 409);
  }

  const project = new ProjectModel({ ...projectData, userId });
  return await project.save();
};


const updateProject = async (projectId, projectData) => {
  const updatedProject = await ProjectModel.findByIdAndUpdate(projectId, projectData, { new: true });
  if (!updatedProject) {
    throw new ServiceError('프로젝트를 찾을 수 없습니다.', 404);
  }
  return updatedProject;
};


const deleteProject = async (projectId) => {
  const deletedProject = await ProjectModel.findByIdAndDelete(projectId);
  if (!deletedProject) {
    throw new ServiceError('프로젝트를 찾을 수 없습니다.', 404);
  }
};

module.exports = {
  getProject,
  createProject,
  updateProject,
  deleteProject,
};
