const nodemailer = require('nodemailer');
const ServiceError = require('../errors/serviceError');


const sendResetEmail = async (to, link) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            to,
            from: process.env.EMAIL_USER,
            subject: '비밀번호 재설정',
            text: `다음 링크에 접속하여 비밀번호를 재설정하세요. ${link}`
        };

        await transporter.sendMail(mailOptions);
    } catch (err) {
        throw new ServiceError('이메일 전송 중 에러: ' + err.message, 500);
    }
        
};


module.exports = { sendResetEmail };