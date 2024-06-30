const UserModel = require('../db/model/userModel');
const InfoModel = require('../db/model/infoModel');
const Education = require('../db/model/educationModel');
const Certification = require('../db/model/certificationModel');
const AwardModel = require('../db/model/awardModel');
const ProjectModel = require('../db/model/projectModel');
const ServiceError = require('../errors/serviceError');

const getMyPageData = async (email) => {
  try {
    const user = await UserModel.findOne({ email });
    const info = await InfoModel.findOne({ userId: user._id });
    const education = await Education.find({ userId: user._id });
    const certification = await Certification.find({ userId: user._id });
    const award = await AwardModel.find({ userId: user._id });
    const project = await ProjectModel.find({ userId: user._id });

    return { user, info, education, certification, award, project };
  } catch (err) {
    throw new ServiceError('마이페이지 데이터를 가져오는 중 오류 발생', 500);
  }
};

const deleteUser = async (email) => {
  try {
    const user = await UserModel.findOneAndUpdate(
      { email },
      { deletedAt: new Date() },
    );
    if (!user) {
      throw new ServiceError('user를 찾을 수 없습니다', 404);
    }
  } catch (err) {
    throw new ServiceError('회원탈퇴 처리 중 오류 발생', 500);
  }
};

module.exports = {
  getMyPageData,
  deleteUser,
};
