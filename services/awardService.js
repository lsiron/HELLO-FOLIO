const AwardModel = require('../db/model/awardModel');
const ServiceError = require('../errors/serviceError');

// Award 데이터 추가 함수
const addAward = async (data) => {
  try {
    // 중복 확인 함수
    const existingAward = await AwardModel.findOne({
      userId: data.userId,
      content: data.content,
      organization: data.organization,
      getDate: data.getDate
    });
    
    if (existingAward) {
      throw new ServiceError('같은 이름의 수상목록이 등록되어 있습니다.', 409);  // 이미 있어서 에러코드 409: 서버 요청 중 충돌
    }

    const award = new AwardModel(data);
    return await award.save();
  } catch (err) {
    throw new ServiceError('수상목록 추가 중 에러: ' + err.message, 500);     
  }
};

// 사용자 ID로 Award 목록 조회 함수
const getAwardByUserId = async (userId) => {
  try {
    return await AwardModel.find({ userId });
  } catch (err) {
    throw new ServiceError('수상 데이터 가져오는 중 오류 발생: ' + err.message, 500);
  }
};

// Award 데이터 업데이트 함수
const updateAward = async (id, data) => {
  try {
    return await AwardModel.findByIdAndUpdate(id, data, { new: true });
  } catch (err) {
    throw new ServiceError('수상 데이터 업데이트 오류: ' + err.message, 500);
  }
};

// Award 데이터 삭제 함수
const deleteAward = async (id) => {
  try {
    return await AwardModel.findByIdAndDelete(id);
  } catch (err) {
    throw new ServiceError('수상 데이터 삭제 오류: ' + err.message, 500);
  }
};

module.exports = {
  addAward,
  getAwardByUserId,
  updateAward,
  deleteAward
};