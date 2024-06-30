const Certification = require('../db/model/certificationModel');
const ServiceError = require('../errors/serviceError');

// certificatoin 데이터 추가함수 
const addCertification = async (data) => {
  try {
      const existingCertification = await Certification.findOne({
          userId: data.userId,
          name: data.name,
          getDate: data.getDate,
      });

      if (existingCertification) {
          throw new ServiceError('같은 이름의 자격증이 등록되어 있습니다', 409);
      }

      const certification = new Certification(data);
      return await certification.save();
  } catch (err) {
      if (err instanceof ServiceError) {
          throw err;
      }
      throw new ServiceError('자격증 추가 중 에러: ' + err.message, 500);
  }
};

// 사용자 id로 certification 목록 조회 함수
const getCertificationByUserId = async (userId) => {
  try {
    return await Certification.find({ userId });
  } catch (err) {
    throw new ServiceError('자격증 데이터 가져오는 중 오류: ' + err.message, 500);
  }
};

// Certification 데이터 업데이트 함수
const updateCertification = async (id, data) => {
  try {
    return await Certification.findByIdAndUpdate(id, data, { new: true });
  } catch (err) {
    throw new ServiceError('자격증 데이터 업데이트 중 오류: ' + err.message, 500);
  }
};

// Certification 데이터 삭제 함수
const deleteCertification = async (id) => {
  try {
    return await Certification.findByIdAndDelete(id);
  } catch (err) {
    throw new ServiceError('자격증 데이터 삭제 중 오류: ' + err.message, 500);
  }
};

module.exports = {
  addCertification,
  getCertificationByUserId,
  updateCertification,
  deleteCertification
};