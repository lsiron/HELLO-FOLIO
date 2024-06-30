// aws S3 라이브러리
const { S3Client } = require('@aws-sdk/client-s3');
// 이미지 업로드 라이브러리
const multer = require('multer');
const multerS3 = require('multer-s3');
// 업로드 한 이미지 삭제 라이브러리
const { DeleteObjectCommand } = require('@aws-sdk/client-s3');
// 모델 불러오기
const UserModel = require('../db/model/userModel');
const InfoModel = require('../db/model/infoModel');

const ServiceError = require('../errors/serviceError');


// aws에 이미지 업로드 및 업로드한 이미지 삭제 시 필요
const s3 = new S3Client({
  region: 'ap-northeast-2',                     // aws s3 region(서울 데이터센터에 저장)
  credentials: {
    accessKeyId: process.env.S3_KEY,            // aws에서 발급받은 엑세스 키
    secretAccessKey: process.env.S3_SECRET,     // aws에서 발급받은 시크릿 키
  },
});


// 이미지 업로드 기능 구현
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'elicewebproject',                       // aws 버킷 이름
    key: function (req, file, cb) {
      cb(null, Date.now().toString());               // 업로드할 이미지 파일명 작성하는 곳
    }
  })
});

async function uploadImage(req, res, next) {
  try {
    // s3에 업로드된 파일의 URL 가져오기
    const imageUrl = req.file.location;
    // 사용자 db 업데이트
    await UserModel.findOneAndUpdate(
      { email: req.user.email },
      { imageUrl: imageUrl },
      { new: true }                                  // 이 옵션을 사용해야 업데이트 후의 문서를 반환함.
    );
    res.redirect('/myPage');
  } catch (err) {
    // console.error(err);
    next(new ServiceError('이미지 업로드 실패', 500));
  }
}

// 업로드 한 이미지 삭제 구현
const deleteImage = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ email: req.user.email });
    if (user.imageUrl) {
      // S3에서 이미지 삭제
      const key = user.imageUrl.split('/').pop();
      const deleteParams = {
        Bucket: 'elicewebproject',
        Key: key,
      };
      await s3.send(new DeleteObjectCommand(deleteParams));
      // DB에서 이미지 URL 제거
      await UserModel.findOneAndUpdate(
        { email: req.user.email },
        { imageUrl: '' },
        { new: true }
      );
    }
    res.redirect('/myPage');
  } catch (err) {
    // console.error(err);
    next(new ServiceError('이미지 삭제 실패', 500));
  }
}

// 유저카드 자기소개 생성
const newInfo = async (req, res, next) => {
    try {
      const { content } = req.body;
      const userId = req.user._id;
  
      const newInfo = await InfoModel.create({ userId, content });
      res.json({ data: newInfo.toObject() });
    } catch (err) {
      next(new ServiceError('자기소개 생성 실패', 500));
    }
  }

// 유저카드 자기소개 수정
const updateInfo = async (req, res, next) => {
    const { id } = req.params;
    const { content } = req.body;
    try {
      const updateInfo = await InfoModel.findOneAndUpdate(
        { userId: id },
        { content },
        {
          runValidators: true,
          new: true,
        }
      ).lean();
  
      res.json({ data: updateInfo });
    } catch (err) {
      next(new ServiceError('자기소개 수정 실패', 500));
    }
  }

  module.exports = {
    s3,
    upload,
    uploadImage,
    deleteImage,
    newInfo,
    updateInfo,
  };