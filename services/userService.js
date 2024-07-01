const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../db/model/userModel');
const ServiceError = require('../errors/serviceError');

const registerUser = async (email, password, name) => {
  // 사용자가 이미 존재하는지 확인
  const checkingUser = await UserModel.findOne({ email });
  if (checkingUser) {
    throw new ServiceError('이미 존재하는 사용자입니다', 400);
  }

  // 비밀번호를 해싱함
  const hashedPassword = await bcrypt.hash(password, 10);

  // 새로운 사용자 생성
  const newUser = {
    email,
    password: hashedPassword,
    name,
    imageUrl: "",
    refreshToken: "",
  };

  await UserModel.create(newUser);
};

const authenticateUser = async (email, password) => {
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new ServiceError('사용자를 찾을 수 없습니다.', 401);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new ServiceError('비밀번호가 일치하지 않습니다.', 401);
  }

  return user;
};

const generateTokens = async (user) => {
  const payload = { _id: user._id };

  // Access Token 발급, 유효 기간 1시간
  const accessToken = jwt.sign(payload, process.env.SECRET, { expiresIn: '1h' });
  // Refresh Token 발급, 유효 기간 2주
  const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, { expiresIn: '14d' });

  // Refresh Token을 DB에 저장
  await UserModel.updateOne({ _id: user._id }, { refreshToken });

  return { accessToken, refreshToken };
};

const logoutUser = async (refreshToken) => {
  if (refreshToken) {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    await UserModel.updateOne({ _id: decoded._id }, { refreshToken: null });
  }
};

module.exports = {
  registerUser,
  authenticateUser,
  generateTokens,
  logoutUser,
};
