const { model } = require('mongoose');
const CertificationSchema = require('../schemas/certificationSchema');
const CertificationModel = model('Certification', CertificationSchema);

module.exports = CertificationModel;