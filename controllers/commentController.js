const commentService = require('../services/commentService');

const newComment = async (req, res, next) => {
  try {
    const newCommentData = await commentService.createComment(req.user, req.body);
    res.json(newCommentData);
  } catch (error) {
    next(error);
  }
};

const updateComment = async (req, res, next) => {
  try {
    const updatedComment = await commentService.updateComment(req.params.id, req.body);
    res.json({ data: updatedComment });
  } catch (error) {
    next(error);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { password } = req.body;
    await commentService.deleteComment(id, password);
    res.json({ message: '댓글이 삭제되었습니다.' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  newComment,
  updateComment,
  deleteComment,
};
