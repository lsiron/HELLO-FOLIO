const ProjectModel = require('../db/model/projectModel');
const ServiceError = require('../errors/serviceError');

// Project 데이터 추가 함수
const addProject = async (data) => {
  try {
    // 중복 확인 함수
    const existingProject = await ProjectModel.findOne({
      userId: data.userId,
      title: data.title,
      content: data.content,
      role: data.role,
      startDate: data.startDate
    });
    
    if (existingProject) {
      throw new ServiceError('같은 이름의 프로젝트가 등록되어 있습니다.', 409);
    }

    const project = new ProjectModel(data);
    return await project.save();
  } catch (err) {
    throw new ServiceError('프로젝트 추가 중 에러: ' + err.message, 500);
  }
};

// 사용자 ID로 Project 목록 조회 함수
const getProjectByUserId = async (userId) => {
  try {
    return await ProjectModel.find({ userId });
  } catch (err) {
    throw new ServiceError('프로젝트 데이터 가져오는 중 오류 발생: ' + err.message, 500);
  }
};

// Project 데이터 업데이트 함수
const updateProject = async (id, data) => {
  try {
    return await ProjectModel.findByIdAndUpdate(id, data, { new: true });
  } catch (err) {
    throw new ServiceError('프로젝트 데이터 업데이트 오류: ' + err.message, 500);
  }
};

// Project 데이터 삭제 함수
const deleteProject = async (id) => {
  try {
    return await ProjectModel.findByIdAndDelete(id);
  } catch (err) {
    throw new ServiceError('프로젝트 데이터 삭제 오류: ' + err.message, 500);
  }
};

module.exports = {
  addProject,
  getProjectByUserId,
  updateProject,
  deleteProject
};