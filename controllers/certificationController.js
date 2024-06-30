const certificationService = require('../services/certificationService');

const getCert = async (req, res, next) => {
  try {
    const cert = await certificationService.getCert(req.user._id);
    res.status(200).json(cert);
  } catch (err) {
    next(err);
  }
};

const createCert = async (req, res, next) => {
  try {
    const newCert = await certificationService.createCert(req.user._id, req.body);
    res.status(201).json(newCert);
  } catch (err) {
    next(err);
  }
};

const updateCert = async (req, res, next) => {
  try {
    const updatedCert = await certificationService.updateCert(req.params.id, req.body);
    res.status(200).json(updatedCert);
  } catch (err) {
    next(err);
  }
};

const deleteCert = async (req, res, next) => {
  try {
    await certificationService.deleteCert(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports = {
    getCert,
    createCert,
    updateCert,
    deleteCert,
  };