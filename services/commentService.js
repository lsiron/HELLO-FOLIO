const CommentModel = require('../db/model/commentModel');
const ServiceError = require('../errors/serviceError');

const createComment = async (user, commentData) => {
  try {
    const { comment, parentId, password } = commentData;
    const writerId = user._id;
    const writer = user.name;

    const newComment = await CommentModel.create({ writerId, writer, comment, parentId, password });
      
    // 페이지네이션을 위해 총 댓글 수를 가져옴
    const totalComments = await CommentModel.countDocuments({ parentId });
    const commentsPerPage = 4; // 페이지당 댓글 수
    const totalPages = Math.ceil(totalComments / commentsPerPage);

    return { data: newComment.toObject(), totalPages };
  } catch (error) {
    throw new ServiceError('댓글 생성 중 에러 발생: ' + error.message, 500);
  }
};

const updateComment = async (commentId, commentData) => {
  try {
    const { comment, password } = commentData;
    const existingComment = await CommentModel.findById(commentId);

    if (!existingComment) {
      throw new ServiceError('댓글을 찾을 수 없습니다.', 404);
    }

    if (existingComment.password !== password) {
      throw new ServiceError('비밀번호가 일치하지 않습니다.', 403);
    }

    existingComment.comment = comment;
    existingComment.updatedAt = Date.now();
    await existingComment.save();

    return existingComment;
  } catch (error) {
    throw new ServiceError('댓글 업데이트 중 에러 발생: ' + error.message, 500);
  }
};

const deleteComment = async (commentId, password) => {
  try {
    const existingComment = await CommentModel.findById(commentId);

    if (!existingComment) {
      throw new ServiceError('댓글을 찾을 수 없습니다.', 404);
    }

    if (existingComment.password !== password) {
      throw new ServiceError('비밀번호가 일치하지 않습니다.', 403);
    }

    await CommentModel.deleteOne({ _id: commentId });

    return { message: '댓글이 삭제되었습니다.' };
  } catch (error) {
    throw new ServiceError('댓글 삭제 중 에러 발생: ' + error.message, 500);
  }
};

module.exports = {
  createComment,
  updateComment,
  deleteComment,
};
