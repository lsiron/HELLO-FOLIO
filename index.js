// 환경변수 라이브러리 불러오기
require('dotenv').config()

// db 연결
const mongoose = require("mongoose");       // MongoConnect() 내부 구현 때문에 선언 해 줘야함 = 명시는 안 해도 내부에서 mongoose 씀
const { MongoConnect } = require("./db");


MongoConnect(); 


// 서버 연결
const { app } = require('./app');

app.listen(process.env.PORT, () => {
    console.log(`서버 실행완료!`);
});
