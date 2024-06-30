const { Router } = require('express');
const router = Router();
const myPageController = require('../controllers/myPageController');
const userCardController = require('../controllers/userCardController');

// 마이페이지 구현
router.get('/', myPageController.getMyPage);

// 회원 탈퇴 구현
router.delete('/deactivate', myPageController.deleteUser);

// 이미지 업로드 기능 구현
router.post('/upload', userCardController.upload.single('profileImage'), userCardController.uploadImage);

// 업로드 한 이미지 삭제 구현
router.delete('/delete', userCardController.deleteImage);

// 유저카드 자기소개 생성
router.post('/info', userCardController.newInfo);

// 유저카드 자기소개 수정
router.put('/info/:id', userCardController.updateInfo);

// 유저 이름 변경
router.put('/name/:id', userCardController.updateName);

// 유저 비밀번호 변경
router.put('/password/:id', userCardController.updatePw);

module.exports = router;