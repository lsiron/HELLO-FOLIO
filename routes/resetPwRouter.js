const { Router } = require('express');
const resetPwRouter = Router();
const resetPwController = require('../controllers/resetPwController');

// 비밀번호 재설정 요청 페이지
resetPwRouter.get('/forgot-password', resetPwController.getForgotPw);

// 비밀번호 재설정 요청 처리
resetPwRouter.post('/forgot-password', resetPwController.newForgotPw);

// 비밀번호 재설정 페이지
resetPwRouter.get('/reset-password/:token', resetPwController.getResetPw);

// 비밀번호 재설정 처리
resetPwRouter.post('/reset-password/:token', resetPwController.newResetPw);

module.exports = resetPwRouter;
