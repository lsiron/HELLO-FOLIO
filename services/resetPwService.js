const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const UserModel = require('../db/model/userModel');
const ServiceError = require('../errors/serviceError');

const sendResetEmail = async (to, link) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      to,
      from: process.env.EMAIL_USER,
      subject: '비밀번호 재설정',
      text: `다음 링크에 접속하여 비밀번호를 재설정하세요. ${link}`,
    };

    await transporter.sendMail(mailOptions);
  } catch (err) {
    throw new ServiceError('이메일 전송 중 에러: ' + err.message, 500);
  }
};

const createResetToken = async (email, host) => {
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new ServiceError('등록된 사용자가 아닙니다.', 400);
  }

  const token = crypto.randomBytes(20).toString('hex');
  user.resetPwToken = token;
  user.resetPwExpires = Date.now() + 3600000; // 만료기간 1시간으로 설정
  await user.save();

  const resetLink = `http://${host}/reset-password/${token}`;
  await sendResetEmail(email, resetLink);
};

const verifyResetToken = async (token) => {
  const user = await UserModel.findOne({
    resetPwToken: token,
    resetPwExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw new ServiceError('유효하지 않거나 만료된 토큰입니다.', 400);
  }

  return user;
};

const resetPassword = async (token, password, confirmPassword) => {
  if (password !== confirmPassword) {
    throw new ServiceError('비밀번호가 일치하지 않습니다.', 400);
  }

  const user = await verifyResetToken(token);

  // 비밀번호를 bcrypt로 해싱하여 저장
  const hashedPassword = await bcrypt.hash(password, 10);
  user.password = hashedPassword;

  // 토큰 관련 필드 초기화
  user.resetPwToken = undefined;
  user.resetPwExpires = undefined;

  await user.save();
};

module.exports = {
  sendResetEmail,
  createResetToken,
  verifyResetToken,
  resetPassword,
};
