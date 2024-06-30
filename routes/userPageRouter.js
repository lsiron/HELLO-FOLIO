const { Router } = require('express');
const router = Router();
const userPageController = require('../controllers/userPageController');
const commentController = require('../controllers/commentController');

// 유저페이지 구현
router.get('/:id', userPageController.getUserPage);

// 댓글 생성
router.post('/comment', commentController.newComment);

// 댓글 수정
router.put('/comment/:id', commentController.updateComment);

// 댓글 삭제
router.delete('/comment/:id', commentController.deleteComment);

module.exports = router;
