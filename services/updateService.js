const bcrypt = require('bcrypt');
const UserModel = require('../db/model/userModel');
const ServiceError = require('../errors/serviceError');

const updateName = async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;
  
    try {
      const updateName = await UserModel.findOneAndUpdate(
        { _id: id },
        { name },
        { new: true}
      ).lean();
  
      res.json({ name: updateName.name });
    } catch (err) {
      next(new ServiceError('이름 업데이트 중 오류'));
    }
  }

  const updatePw = async (req, res, next) => {
    const { id } = req.params;
    const { currentPassword, newPassword } = req.body;
  
    try {
      const user = await UserModel.findById(id);
  
      // 현재 비밀번호 확인
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        throw new ServiceError('현재 비밀번호가 일치하지 않습니다..', 400);
      }
  
      // 새로운 비밀번호 해싱
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      // 비밀번호 업데이트
      const updatePw = await UserModel.findOneAndUpdate(
        { _id: id },
        { password: hashedPassword },
        { new: true }
      );
  
      res.json({ password : updatePw.password });
    } catch (err) {
      next(new ServiceError('비밀번호 업데이트 중 오류: ' + err.message, 500));
    }
  }

  
  module.exports = {
    updateName,
    updatePw
  };