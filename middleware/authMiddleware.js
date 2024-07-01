const jwt = require('jsonwebtoken');
const UserModel = require('../db/model/userModel');

const authMiddleware = async (req, res, next) => {
  try {
    // 쿠키에서 accessToken과 refreshToken 추출
    const { accessToken, refreshToken } = req.cookies;

    // accessToken과 refreshToken 둘 다 없을 때
    if (!accessToken && !refreshToken) {
      return res.status(403).send('Access Token 과 Refresh Token이 없습니다');
    }

    // accessToken이 있을 때, 검증 후 토큰의 유효성을 확인하고 jwt.verify로 access Token 해독 후, 사용자를 찾음
    if (accessToken) {
      try {
        const accessPayload = jwt.verify(accessToken, process.env.SECRET);
        const user = await UserModel.findOne({ _id: accessPayload._id });
        if (!user) {
          return res.status(401).send('사용자를 찾을 수 없습니다');
        }
        req.user = user; // 사용자 정보를 요청 객체에 설정
        return next();
      } catch (err) {
        // 유효한 accessToken이 없을 때
        if (err.name !== 'TokenExpiredError') {
          return res.status(403).send('Access Token이 유효하지 않습니다');
        }
        // TokenExpiredError인 경우 아래에서 처리(access token 만료)
      }
    }

    // refreshToken이 있을 때, 검증 후 토큰의 유효성을 확인하고 jwt.verify로 refresh Token 해독 후, 사용자를 찾음
    if (refreshToken) {
      try {
        const refreshPayload = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
        const user = await UserModel.findOne({ _id: refreshPayload._id, refreshToken });
        if (!user) {
          return res.status(403).send('사용자를 찾을 수 없습니다');
        }

        // 유효한 refreshToken이 있을 때, 엑세스 토큰을 쿠키에 재발급해줌
        const newAccessToken = jwt.sign({ _id: refreshPayload._id }, process.env.SECRET, { expiresIn: '1h' });
        res.cookie('accessToken', newAccessToken, { httpOnly: true });
        req.user = user; // 사용자 정보를 요청 객체에 설정
        return next();
      } catch (err) {
        return res.status(403).send('유효하지 않은 Refresh Token입니다');
      }
    }

    // 유효한 refreshToken이 없을 때, 재로그인 유도
    return res.status(403).redirect('/login');
  } catch (err) {
    return res.status(500).send('내부 서버 오류발생');
  }
};

module.exports = authMiddleware;