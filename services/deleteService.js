const UserModel = require('../db/model/userModel');
const ServiceError = require('../errors/serviceError');


// 회원탈퇴 구현(소프트 삭제)
const deleteUser = async (req, res, next) => {
  try {
    const user = await UserModel.findOneAndUpdate(
      { email: req.user.email }, // 현재 로그인된 사용자의 이메일을 사용
      { deletedAt: new Date() },
    );
    if (!user) {
      next(new ServiceError('user를 찾을 수 없습니다', 404));  // 요 부분은 
    }

    res.status(200).redirect('/login')
  } catch (err) {
    next(new ServiceError('내부 서버 에러', 500));
  }
}


module.exports = {
  deleteUser,
};