const { Router } = require('express');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const UserModel = require('../db/model/userModel');
const { sendResetEmail } = require('../services/emailService');
const ServiceError = require('../errors/serviceError');

const resetPwRouter = Router();

// 비밀번호 재설정 요청 페이지
resetPwRouter.get('/forgot-password', (req, res, next) => {
    res.render('forgot-pw.ejs');
});

// 비밀번호 재설정 요청 처리
resetPwRouter.post('/forgot-password', async (req, res, next) => {
    try {
        const { email }  = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            throw new ServiceError('등록된 사용자가 아닙니다.', 400);
        }

        const token = crypto.randomBytes(20).toString('hex');
        user.resetPwToken = token;
        user.resetPwExpires = Date.now() + 3600000; // 만료기간 1시간으로 설정
        await user.save();

        const resetLink = `http://${req.headers.host}/reset-password/${token}`;
        await sendResetEmail(email, resetLink);

        res.json({ success: true, message: "비밀번호 재설정 링크가 이메일로 전송되었습니다." });
    } catch (error) {
        next(error);
    }
});

// 비밀번호 재설정 페이지
resetPwRouter.get('/reset-password/:token', async (req, res, next) => {
    try {
        const { token } = req.params;
        const user = await UserModel.findOne({
            resetPwToken: token,
            resetPwExpires: { $gt: Date.now() }
        });

        if (!user) {
            throw new ServiceError('유효하지 않거나 만료된 토큰입니다.', 400);
        }

        res.render('reset-pw.ejs', { token });
    } catch (error) {
        next(error);
    }
});

// 비밀번호 재설정 처리
resetPwRouter.post('/reset-password/:token', async (req, res, next) => {
    try {
        const { token } = req.params;
        const { password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            throw new ServiceError('비밀번호가 일치하지 않습니다.', 400);
        }

        const user = await UserModel.findOne({
            resetPwToken: token,
            resetPwExpires: { $gt: Date.now() }
        });

        if (!user) {
            throw new ServiceError('유효하지 않거나 만료된 토큰입니다.', 400);
        }

        // 비밀번호를 bcrypt로 해싱하여 저장
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;

        // 토큰 관련 필드 초기화
        user.resetPwToken = undefined;
        user.resetPwExpires = undefined;

        await user.save();

        res.json({ success: true, message: "비밀번호가 성공적으로 재설정되었습니다." });
    } catch (error) {
        next(error);
    }
});

module.exports = resetPwRouter;