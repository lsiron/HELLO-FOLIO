const { UserModel, InfoModel, EducationModel, CertificationModel, AwardModel, ProjectModel, CommentModel } = require('../db/model');
const ServiceError = require('../errors/serviceError');

const getUserPageData = async (id, page) => {
  try {
    const user = await UserModel.findOne({ _id: id });
    const info = await InfoModel.findOne({ userId: id });
    const award = await AwardModel.find({ userId: id });
    const project = await ProjectModel.find({ userId: id });
    const education = await EducationModel.find({ userId: id });
    const certification = await CertificationModel.find({ userId: id });

    const commentsPerPage = 4;
    const totalComments = await CommentModel.countDocuments({ parentId: id });
    const totalPages = Math.max(Math.ceil(totalComments / commentsPerPage), 1);

    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;

    const skip = (page - 1) * commentsPerPage;

    const comment = await CommentModel.find({ parentId: id })
      .skip(skip)
      .limit(commentsPerPage)
      .exec();

    return {
      user,
      info,
      award,
      project,
      education,
      certification,
      comment,
      currentPage: page,
      totalPages: totalPages,
      hasPrev: page > 1,
      hasNext: page < totalPages
    };
  } catch (error) {
    throw new ServiceError('유저 페이지 데이터를 가져오는 중 에러 발생: ' + error.message, 500);
  }
};

module.exports = {
  getUserPageData,
};
