const { model } = require('mongoose');
const UserSchema = require('../schemas/userSchema');  
const UserModel = model('User', UserSchema); // 가져온 UserSchema 모델화

module.exports = UserModel;