const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    // 이미지 업로드 
    imageUrl: {
        type: String,
        default: "https://images.unsplash.com/photo-1520188740392-665a13f453fc?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    // 회원 탈퇴
    deletedAt: {
        type: Date,
        default: null
    },
    // 비밀번호 찾기 토큰
    resetPwToken: {
        type: String,
    },
    resetPwExpires: {
        type: Date,
    },
    // 로그인 토큰
    refreshToken: {
        type: String,
    },
  },
{
    collection: "users",
    timestamps: true,
});

// 저장 전에 img url이 비어있는 경우 기본이미지 설정
UserSchema.pre('save', function (next) {
    if (!this.imageUrl) {
        this.imageUrl = "https://images.unsplash.com/photo-1520188740392-665a13f453fc?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    }
    next();
});

// 업데이트시 img url이 빈 문자열인 경우 기본이미지 설정
UserSchema.pre('findOneAndUpdate', function (next) {
    const update = this.getUpdate();
    if (update && update.imageUrl === "") {
        this.getUpdate().imageUrl = "https://images.unsplash.com/photo-1520188740392-665a13f453fc?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    }
    next();
});

module.exports = UserSchema;
