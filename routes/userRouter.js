const { Router } = require('express');
const router = Router();
const userController = require('../controllers/userController');

// 초기 페이지 구현 (로그인 했을 경우, 메인페이지로 이동, 안 했을경우, 로그인 페이지로 이동)
router.get('/', (req, res) => {
  res.redirect('/login');
});

// 회원가입 페이지 구현
router.get('/register', userController.renderRegisterPage);

// 회원가입 기능 구현
router.post('/register', userController.registerUser);

// 로그인 페이지 구현
router.get('/login', userController.renderLoginPage);

// 로그인 기능 구현
router.post('/login', userController.loginUser);

// 로그아웃 기능 구현
router.get('/logout', userController.logoutUser);

module.exports = router;
