const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('../../db/model/userModel');
const bcrypt = require('bcrypt');

const config = {
    usernameField: 'email',
    passwordField: 'password',
};

// 사용자가 로그인 할 때 사용자 인증을 처리하는 방식. 로그인 요청을 보낼 때 적용.
// LocalStrategy를 Passport에 등록하고, Passport의 authenticate 메서드를 사용하는 라우트에 연결할 때 실행됨
// router.post('/login') 에서 실행되면, 라우터의 authenticate 메서드로 인해 passport-lacal 전략은 사용자의 이메일과 비밀번호를 확인 함.
const local = new LocalStrategy(config, async (email, password, done) => {  
    try {
        //로그인 할 때 이메일 확인   
        const user = await UserModel.findOne({ email });                            // db에서 이메일로 사용자를 찾음
        if (!user) {
            return done(null, false, { message: '회원을 찾을 수 없습니다' });
        }
        //로그인 할 때 비밀번호 확인
        const isMatch = await bcrypt.compare(password, user.password);              // 저장된 비밀번호와 입력된 비밀번호 비교
        if (!isMatch) {
            return done(null, false, { message: '비밀번호가 다릅니다' });
        }
        // 로그인 할 때 active 상태 확인(회원탈퇴 상태인지 확인)
        if (user.deletedAt) {
            return done(null, false, { message: '회원탈퇴 유저입니다' });
        }

        //로그인 성공 시, 사용자 객체를(인증정보를) 'done' 콜백으로 라우터에 전달, 즉 req.user에 사용자 객체를 저장함. 이제 다시 로그인 라우터로 넘어감.
        return done(null, user);
    } catch(error) {
        done(error, null);
    }
});

module.exports = local;


