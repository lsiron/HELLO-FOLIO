const CommentModel = require('../db/model/commentModel');
const ServiceError = require('../errors/serviceError');

const newComment = async (req, res, next) => {
    try {
      const { comment, parentId, password } = req.body;
      const writerId = req.user._id;
      const writer = req.user.name;
  
      const newComment = await CommentModel.create({ writerId, writer, comment, parentId, password });
      
       // 페이지네이션을 위해 총 댓글 수를 가져옴
       const totalComments = await CommentModel.countDocuments({ parentId });
       const commentsPerPage = 4; // 페이지당 댓글 수
       const totalPages = Math.ceil(totalComments / commentsPerPage);

       res.json({ data: newComment.toObject(), totalPages });
    } catch (error) {
      next(error);
    }
  }

const updateComment = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { comment, password } = req.body;
      const existingComment = await CommentModel.findById(id);
  
      if (!existingComment) {
        throw new ServiceError('댓글을 찾을 수 없습니다.', 404);
      }
  
      if (existingComment.password !== password) {
        throw new ServiceError('비밀번호가 일치하지 않습니다.', 404);
      }
  
      existingComment.comment = comment;
      existingComment.updatedAt = Date.now();
      await existingComment.save();
  
      res.json({ data: existingComment });
    } catch (err) {
      next(new ServiceError('댓글 업데이트 중 에러: ' + err.message, 500));
    }
  }

const deleteComment = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { password } = req.body;
      const existingComment = await CommentModel.findById(id);
  
      if (!existingComment) {
        throw new ServiceError('댓글을 찾을 수 없습니다.', 404);
      }
  
      if (existingComment.password !== password) {
        throw new ServiceError('비밀번호가 일치하지 않습니다.', 403);
      }
  
      await CommentModel.deleteOne({ _id: id });
  
      res.json({ message: '댓글이 삭제되었습니다.' });
    } catch (err) {
      next(new ServiceError('댓글 삭제 중 에러: ', err.message, 500));
    }
  }

  module.exports = {
    newComment,
    updateComment,
    deleteComment,
  };