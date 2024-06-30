const AwardModel = require('../db/model/awardModel');
const ServiceError = require('../errors/serviceError');

const getAward = async (userId) => {
  return await AwardModel.find({ userId });
};

const createAward = async (userId, awardData) => {
  const existingAward = await AwardModel.findOne({
    userId,
    content: awardData.content,
    organization: awardData.organization,
    getDate: awardData.getDate
  });

  if (existingAward) {
    throw new ServiceError('같은 이름의 수상이 등록되어 있습니다.', 409);
  }

  const award = new AwardModel({ ...awardData, userId });
  return await award.save();
};

const updateAward = async (awardId, updateData) => {
  const updatedAward = await AwardModel.findByIdAndUpdate(awardId, updateData, { new: true });
  if (!updatedAward) {
    throw new ServiceError('수상을 찾을 수 없습니다.', 404);
  }
  return updatedAward;
};

const deleteAward = async (awardId) => {
  const deletedAward = await AwardModel.findByIdAndDelete(awardId);
  if (!deletedAward) {
    throw new ServiceError('수상을 찾을 수 없습니다.', 404);
  }
};

module.exports = {
  getAward,
  createAward,
  updateAward,
  deleteAward,
};