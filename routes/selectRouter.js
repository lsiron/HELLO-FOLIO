const { Router } = require('express');
const router = Router();
const UserModel = require('../db/model/userModel');
const ServiceError = require('../errors/serviceError');

// 로그인 후 포트폴리오 선택 페이지 구현(pagination 구현)
router.get('/select', async (req, res) => {
try{
  let page = parseInt(req.query.page) || 1;
  const usersPerPage = 8;
  const totalUsers = await UserModel.countDocuments();
  const totalPages = Math.max(Math.ceil(totalUsers / usersPerPage), 1);

  // page는 무조건 1로 시작하도록
  if (page < 1) page = 1;
  if (page > totalPages) page = totalPages;

  const skip = (page - 1) * usersPerPage;
  
  // skip이 음수일 때 
  if (skip < 0) {
    throw new ServiceError('유저가 없습니다', 400);
  }

  const users = await UserModel.find({ deletedAt: null })
    .skip(skip)
    .limit(usersPerPage)
    .exec();

  const user = await UserModel.findOne({ email: req.user.email });

  res.render('select.ejs', {
    users: users,
    user: user,
    currentPage: page,
    totalPages: totalPages,
    hasPrev: page > 1,
    hasNext: page < totalPages,
  });
  }catch(error){
    next(error);
  }
});
  
  module.exports = router;