const { Router } = require('express');
const router = Router();
const selectController = require('../controllers/selectController');

// 로그인 후 포트폴리오 선택 페이지 구현(pagination 구현)
router.get('/select', selectController.getSelectPage);

module.exports = router;
