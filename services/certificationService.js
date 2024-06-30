const CertificationModel = require('../db/model/certificationModel');
const ServiceError = require('../errors/serviceError');

const getCert = async (userId) => {
  return await CertificationModel.find({ userId });
};

const createCert = async (userId, certData) => {
  const existingCert = await CertificationModel.findOne({
    userId,
    name: certData.name,
    getDate: certData.getDate,
  });

  if (existingCert) {
    throw new ServiceError('같은 이름의 자격증이 등록되어 있습니다', 409);
  }

  const cert = new CertificationModel({ ...certData, userId });
  return await cert.save();
};

const updateCert = async (certId, updateData) => {
  const updatedCert = await CertificationModel.findByIdAndUpdate(certId, updateData, { new: true });
  if (!updatedCert) {
    throw new ServiceError('자격증을 찾을 수 없습니다.', 404);
  }
  return updatedCert;
};

const deleteCert = async (certId) => {
  const deletedCert = await CertificationModel.findByIdAndDelete(certId);
  if (!deletedCert) {
    throw new ServiceError('자격증을 찾을 수 없습니다.', 404);
  }
};

module.exports = {
  getCert,
  createCert,
  updateCert,
  deleteCert,
};