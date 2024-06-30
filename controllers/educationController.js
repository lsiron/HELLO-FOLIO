const educationService = require('../services/educationService');

const getEdu = async (req, res, next) => {
  try {
    const edu = await educationService.getEdu(req.user._id);
    res.status(200).json(edu);
  } catch (err) {
    next(err);
  }
};

const createEdu = async (req, res, next) => {
  try {
    const newEdu = await educationService.createEdu(req.user._id, req.body);
    res.status(201).json(newEdu);
  } catch (err) {
    next(err);
  }
};

const updateEdu = async (req, res, next) => {
  try {
    const updatedEdu = await educationService.updateEdu(req.params.id, req.body);
    res.status(200).json(updatedEdu);
  } catch (err) {
    next(err);
  }
};

const deleteEdu = async (req, res, next) => {
  try {
    await educationService.deleteEdu(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports = {
    getEdu,
    createEdu,
    updateEdu,
    deleteEdu,
  };