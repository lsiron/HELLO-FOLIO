// 모델 정의 
const { model } = require('mongoose');
const EducationSchema = require('../schemas/educationSchema'); // education 스키마 
const EducationModel = model('Education', EducationSchema); // 스키마 모델화

module.exports = EducationModel; 
