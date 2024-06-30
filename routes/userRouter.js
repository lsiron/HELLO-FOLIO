const { Router } = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');                             // bcrypt 라이브러리 불러오기(PW 암호화)
const jwt = require('jsonwebtoken')
const UserModel = require('../db/model/userModel');           // db파일의 models에서 User class 불러오기

const ServiceError = require('../errors/serviceError');

const router = Router();

// 초기 페이지 구현 (로그인 했을 경우, 메인페이지로 이동, 안 했을경우, 로그인 페이지로 이동)
router.get('/', (req, res) => {
  res.redirect('/login');                                 
})

// 회원가입 페이지 구현
router.get('/register', (req, res) => {
  res.render('register.ejs');
});

// 회원가입 기능 구현
router.post('/register', async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

      // 사용자가 이미 존재하는지 확인
      const checkingUser = await UserModel.findOne({ email });
      if (checkingUser) {
        throw new ServiceError('이미 존재하는 사용자입니다', 400);
      }

      // 비밀번호를 해싱함
      const hashedPassword = await bcrypt.hash(password, 10);  // 첫번째 인자는 password 변수 두번째 인자는 몇번 꼬을지 횟수

      // 새로운 사용자 생성
      const newUser = {
          email,
          password : hashedPassword,
          name,
          imageUrl: "",
          refreshToken: "",
      };

      await UserModel.create( newUser );

      res.status(201).redirect('/login');
  } catch (error) {
      next(error);

  }
});

// 로그인 페이지 구현
router.get('/login', (req, res) => {
    res.render('home.ejs');
});

// 로그인 기능 구현
// passport.authenticate 메서드를 사용하여 사용자를 인증함. 이 메서드가 실행되면 passport 전략의 local로 넘어감.
router.post('/login', (req, res, next) => {
  passport.authenticate('local', { session: false }, async (err, user, info) => {
    if (err) {
      return next(new ServiceError('로그인 에러', 500));
    }
    if (!user) {
      // 로그인 실패 시 local strategy에 설정한 메시지 전달
      // res.locals.errorMessage = info.message;
      // return res.status(401).render('home.ejs');
      return next(new ServiceError(info.message, 401, 'home.ejs'));
    }
    try {
      const userObject = user.toObject();
      const payload = { email: userObject.email };
      
      // Access Token 발급, 유효 기간 1시간
      const accessToken = jwt.sign(payload, process.env.SECRET, { expiresIn: '1h' });
      // Refresh Token 발급, 유효 기간 2주
      const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, { expiresIn: '14d' });

      // Refresh Token을 DB에 저장
      await UserModel.updateOne({ email: userObject.email }, { refreshToken });

      // 토큰을 쿠키로 전달, httpOnly로 설정된 쿠키는 클라이언트 측 스크립트에서는 읽거나 수정 안됨.
      res.cookie('accessToken', accessToken, { httpOnly: true });         
      res.cookie('refreshToken', refreshToken, { httpOnly: true });

      res.redirect('/myPage');
    } catch (error) {
      next(error);
    }
  })(req, res, next);
});


// 로그아웃 기능 구현
router.get('/logout', async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    if (refreshToken) {
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
      await UserModel.updateOne({ email: decoded.email }, { refreshToken: null });
    }
    // access 토큰과 refresh 토큰 쿠키의 값을 빈 문자열로 설정하고 maxAge로 쿠키의 유효시간을 0으로 설정하여 삭제함
    res.cookie('accessToken', '', { maxAge: 0, httpOnly: true }); 
    res.cookie('refreshToken', '', { maxAge: 0, httpOnly: true });
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});

module.exports = router;