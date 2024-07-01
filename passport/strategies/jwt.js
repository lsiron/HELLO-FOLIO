// 사용자가 JWT 토큰을 가지고 인증이 필요한 요청을 보낼 때 사용됨. 사용자의 인증 상태를 확인할 때 사요.
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const UserModel = require('../../db/model/userModel');

const opts = {
  //env에서 선언한 secret 사용
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET,
};

const jwt = new JwtStrategy(opts, async (jwtPayload, done) => {
  try {
    const user = await UserModel.findOne({ _id: jwtPayload._id });
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (err) {
    return done(err, false);
  }
});

module.exports = jwt;





