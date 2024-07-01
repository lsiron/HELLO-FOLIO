const EducationModel = require('../db/model/educationModel');
const ServiceError = require('../errors/serviceError');
const ConflictError = require('../errors/conflictError');

const getEdu = async (userId) => {
  return await EducationModel.find({ userId });
};

const createEdu = async (userId, eduData) => {
  const existingEdu = await EducationModel.findOne({
    userId,
    school: eduData.school,
    major: eduData.major,
    degree: eduData.degree,
    startDate: eduData.startDate,
    endDate: eduData.endDate
  });

  if (existingEdu) {
    throw new ConflictError('같은 이름의 학력이 등록되어 있습니다.', 409);
  }

  const edu = new EducationModel({ ...eduData, userId });
  return await edu.save();
};

const updateEdu = async (eduId, updateData) => {
  const updatedEdu = await EducationModel.findByIdAndUpdate(eduId, updateData, { new: true });
  if (!updatedEdu) {
    throw new ServiceError('학력을 찾을 수 없습니다.', 404);
  }
  return updatedEdu;
};

const deleteEdu = async (eduId) => {
  const deletedEdu = await EducationModel.findByIdAndDelete(eduId);
  if (!deletedEdu) {
    throw new ServiceError('학력을 찾을 수 없습니다.', 404);
  }
};

module.exports = {
  getEdu,
  createEdu,
  updateEdu,
  deleteEdu,
};