const { Router } = require('express');
const router = Router();
const UserModel = require('../db/model/userModel');
const InfoModel = require('../db/model/infoModel');
const AwardModel = require('../db/model/awardModel');
const ProjectModel = require('../db/model/projectModel');
const Education = require('../db/model/educationModel');
const certificationModel = require('../db/model/certificationModel');
const CommentModel = require('../db/model/commentModel');
const { newComment, updateComment, deleteComment } = require('../services/commentService');
const ServiceError = require('../errors/serviceError');

// 유저페이지 구현 
router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findOne({ _id : id });
    const info = await InfoModel.findOne({userId: id});    
    const award = await AwardModel.find({userId: id});
    const project = await ProjectModel.find({userId: id});
    const education = await Education.find({userId: id});
    const certification = await certificationModel.find({userId: id});
    const loggedInUser = req.user; // 로그인한 사용자 정보
    
    const commentsPerPage = 4;
    const totalComments = await CommentModel.countDocuments({parentId: id});
    const totalPages = Math.max(Math.ceil(totalComments / commentsPerPage), 1);

    // page가 없을 경우 마지막 페이지로 설정
    let page = parseInt(req.query.page) || totalPages;

    // page는 무조건 1로 시작하도록
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
  
    const skip = (page - 1) * commentsPerPage;
  
    const comment = await CommentModel.find({parentId: id})
      .skip(skip)
      .limit(commentsPerPage)
      .exec();

    res.render('userPage.ejs', { user, loggedInUser, info, award, project, education, certification, comment,
      currentPage: page,
      totalPages: totalPages,
      hasPrev: page > 1,
      hasNext: page < totalPages, });
  } catch (error) {
    next(error);
  }
});

// 댓글 생성
router.post('/comment', newComment);

// 댓글 수정
router.put('/comment/:id', updateComment);

// 댓글 삭제
router.delete('/comment/:id', deleteComment);

module.exports = router;
