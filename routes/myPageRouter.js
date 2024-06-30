const { Router } = require('express');
const router = Router();
const { upload, uploadImage, deleteImage, newInfo, updateInfo } = require('../services/userCardService');
const { deleteUser } = require('../services/deleteService');  // 회원탈퇴 로직 가져오기
const { updateName, updatePw } = require('../services/updateService');
const UserModel = require('../db/model/userModel');
const InfoModel = require('../db/model/infoModel');
const Education = require('../db/model/educationModel');
const Certification = require('../db/model/certificationModel');
const AwardModel = require('../db/model/awardModel')
const ProjectModel = require('../db/model/projectModel')
const ServiceError = require('../errors/serviceError');

// 마이페이지 구현
router.get('/', async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ email: req.user.email });
    const info = await InfoModel.findOne({ userId: user._id });
    const education = await Education.find({ userId: user._id });
    const certification = await Certification.find({ userId: user._id });
    const award = await AwardModel.find({userId: user._id});
    const project = await ProjectModel.find({userId: user._id});

    res.render('myPage.ejs', { user, info, education, certification, award, project });
  } catch (err) {
    next(err);
  }

});
// 이미지 업로드 기능 구현
router.post('/upload', upload.single('profileImage'), uploadImage);

// 업로드 한 이미지 삭제 구현
router.delete('/delete', deleteImage);

// 유저카드 자기소개 생성
router.post('/info', newInfo);

// 유저카드 자기소개 수정
router.put('/info/:id', updateInfo);

// 회원 탈퇴 구현
router.delete('/deactivate', deleteUser);

// 유저 이름 변경
router.put('/name/:id', updateName);

// 유저 비밀번호 변경
router.put('/password/:id', updatePw);

  
module.exports = router;
