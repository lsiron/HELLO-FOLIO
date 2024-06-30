const UserModel = require('../db/model/userModel');
const ServiceError = require('../errors/serviceError');

const getSelectPageData = async (email, page) => {
  try {
    const usersPerPage = 8;
    const totalUsers = await UserModel.countDocuments();
    const totalPages = Math.max(Math.ceil(totalUsers / usersPerPage), 1);

    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;

    const skip = (page - 1) * usersPerPage;

    if (skip < 0) {
      throw new ServiceError('유저가 없습니다', 400);
    }

    const users = await UserModel.find({ deletedAt: null })
      .skip(skip)
      .limit(usersPerPage)
      .exec();

    const user = await UserModel.findOne({ email });

    return {
      users,
      user,
      currentPage: page,
      totalPages,
      hasPrev: page > 1,
      hasNext: page < totalPages,
    };
  } catch (error) {
    throw new ServiceError('페이지 데이터 가져오기 중 에러 발생: ' + error.message, 500);
  }
};

module.exports = {
  getSelectPageData,
};
