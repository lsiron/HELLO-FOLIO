const resetPwService = require('../services/resetPwService');

const getForgotPw = (req, res, next) => {
  res.render('forgot-pw.ejs');
};

const newForgotPw = async (req, res, next) => {
  try {
    const { email } = req.body;
    await resetPwService.createResetToken(email, req.headers.host);
    res.json({ success: true, message: "비밀번호 재설정 링크가 이메일로 전송되었습니다." });
  } catch (error) {
    next(error);
  }
};

const getResetPw = async (req, res, next) => {
  try {
    const { token } = req.params;
    await resetPwService.verifyResetToken(token);
    res.render('reset-pw.ejs', { token });
  } catch (error) {
    next(error);
  }
};

const newResetPw = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;
    await resetPwService.resetPassword(token, password, confirmPassword);
    res.json({ success: true, message: "비밀번호가 성공적으로 재설정되었습니다." });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getForgotPw,
  newForgotPw,
  getResetPw,
  newResetPw,
};
