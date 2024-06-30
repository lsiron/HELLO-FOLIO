const Education = require('../db/model/educationModel');
const ServiceError = require('../errors/serviceError');


// Education 데이터 추가 함수
const addEducation = async (data) => {
  try {
    // 중복 확인 함수
    const existingEducation = await Education.findOne({
      userId: data.userId,
      school: data.school,
      major: data.major,
      degree: data.degree,
      startDate: data.startDate,
      endDate: data.endDate
    });
    
    if (existingEducation) {
      throw new ServiceError('같은 이름의 학력이 등록되어 있습니다.', 409);
    }

    const education = new Education(data);
    return await education.save();
  } catch (err) {
    throw new ServiceError('학력 추가 중 에러: ' + err.message, 500);
  }
};

// 사용자 ID로 Education 목록 조회 함수
const getEducationByUserId = async (userId) => {
  try {
    return await Education.find({ userId });
  } catch (err) {
    throw new ServiceError('학력 데이터 가져오는 중 오류 발생: ' + err.message, 500);
  }
};

// Education 데이터 업데이트 함수
const updateEducation = async (id, data) => {
  try {
    return await Education.findByIdAndUpdate(id, data, { new: true });
  } catch (err) {
    throw new ServiceError('학력데이터 업데이트 오류: ' + err.message, 500);
  }
};

// Education 데이터 삭제 함수
const deleteEducation = async (id) => {
  try {
    return await Education.findByIdAndDelete(id);
  } catch (err) {
    throw new ServiceError('학력데이터 삭제 오류: ' + err.message, 500);
  }
};

module.exports = {
  addEducation,
  getEducationByUserId,
  updateEducation,
  deleteEducation
};