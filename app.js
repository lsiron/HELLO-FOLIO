const express = require('express');                     // express 라이브러리 불러오기
const app = express();                                  // express 라이브러리 불러오기
const cookieParser = require('cookie-parser');          // cookie=Parser 라이브러리 불러오기
const passport = require('passport')                    // passport 라이브러리 불러오기
const methodOverride = require('method-override')       // method-override 라이브러리 불러오기

const { userRouter, selectRouter, myPageRouter, userPageRouter, resetPwRouter, educationRouter, certificationRouter, awardRouter, projectRouter } = require("./routes");             // Router를 객체에 담기               

// passport 설정 불러오기
require('./passport')();                                            // passport 초기화 및 전략 등록
const authMiddleware = require('./middleware/authMiddleware');       // 인증 미들웨어 불러오기
const ServiceError = require('./errors/serviceError');

app.use(express.static(__dirname + '/public'));         // static 파일 경로지정
app.set('view engine', 'ejs');                          // ejs 라이브러리 불러오기
app.use(express.json());                                // 유저가 데이터를 서버로 보내면 쉽게 꺼내 쓸 수 있도록 하는 코드 , 서버에서 req.body 쓰려면 필요함
app.use(express.urlencoded({ extended: false }));       // 유저가 데이터를 서버로 보내면 쉽게 꺼내 쓸 수 있도록 하는 코드 , 서버에서 req.body 쓰려면 필요함
app.use(cookieParser());                                // cookie-Parser 라이브러리 사용
app.use(methodOverride('_method'))                      // methodOverride 라이브러리 사용

app.use(passport.initialize());                         // passport.authenticate 작동

// 인증이 필요없는 라우터
app.use('/', userRouter);                               // homeRouter 작동
app.use('/', resetPwRouter);                            // resetPwRouter 작동

// 인증이 필요한 라우터 (순서 중요함)
app.use('/', authMiddleware, selectRouter);                   // selectRouter 작동
app.use('/my-page', authMiddleware, myPageRouter);             // myPageRouter 작동
app.use('/my-page', authMiddleware, educationRouter);          // educationRouter 작동
app.use('/my-page', authMiddleware, certificationRouter);      // certificationRouter 작동
app.use('/my-page', authMiddleware, awardRouter);              // awardRouter 작동
app.use('/my-page', authMiddleware, projectRouter);            // projectRouter 작동
app.use('/user-page', authMiddleware, userPageRouter);         // userPageRouter 작동

// 에러 핸들링 미들웨어 => 핸들링 처리의 끝지점
// renderPage추가 된 경우 해당 페이지 렌더링 => login화면의 alert활성화
app.use((err, req, res, next) => {
  if (err instanceof ServiceError) {
    if (err.renderPage) {
      return res.status(err.statusCode).render(err.renderPage, { errorMessage: err.message });
    }
    return res.status(err.statusCode).json({ error: err.message });
  }

  res.status(500).json({ error: '내부 서버 오류' });
});


exports.app = app;
