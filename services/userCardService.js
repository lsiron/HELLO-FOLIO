const { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const multer = require('multer');
const multerS3 = require('multer-s3');
const UserModel = require('../db/model/userModel');
const InfoModel = require('../db/model/infoModel');
const ServiceError = require('../errors/serviceError');
const bcrypt = require('bcrypt');

const s3 = new S3Client({
  region: 'ap-northeast-2',
  credentials: {
    accessKeyId: process.env.S3_KEY,
    secretAccessKey: process.env.S3_SECRET,
  },
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'elicewebproject',
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    }
  })
});

const uploadImage = async (req) => {
  const imageUrl = req.file.location;
  await UserModel.findOneAndUpdate(
    { email: req.user.email },
    { imageUrl: imageUrl },
    { new: true }
  );
};

const deleteImage = async (email) => {
  const user = await UserModel.findOne({ email });
  if (user.imageUrl) {
    const key = user.imageUrl.split('/').pop();
    const deleteParams = {
      Bucket: 'elicewebproject',
      Key: key,
    };
    await s3.send(new DeleteObjectCommand(deleteParams));
    await UserModel.findOneAndUpdate(
      { email },
      { imageUrl: '' },
      { new: true }
    );
  }
};

const newInfo = async (userId, content) => {
  return await InfoModel.create({ userId, content });
};

const updateInfo = async (userId, content) => {
  return await InfoModel.findOneAndUpdate(
    { userId },
    { content },
    {
      runValidators: true,
      new: true,
    }
  ).lean();
};

const updateName = async (id, name) => {
  const updatedName = await UserModel.findOneAndUpdate(
    { _id: id },
    { name },
    { new: true }
  ).lean();
  return updatedName.name;
};

const updatePw = async (id, currentPassword, newPassword) => {
  const user = await UserModel.findById(id);
  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    throw new ServiceError('현재 비밀번호가 일치하지 않습니다.', 400);
  }
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  const updatedPw = await UserModel.findOneAndUpdate(
    { _id: id },
    { password: hashedPassword },
    { new: true }
  );
  return updatedPw.password;
};

module.exports = {
  s3,
  upload,
  uploadImage,
  deleteImage,
  newInfo,
  updateInfo,
  updateName,
  updatePw,
};
