const awardService = require('../services/awardService');

const getAward = async (req, res, next) => {
  try {
    const awards = await awardService.getAward(req.user._id);
    res.status(200).json(awards);
  } catch (err) {
    next(err);
  }
};

const createAward = async (req, res, next) => {
  try {
    const newAward = await awardService.createAward(req.user._id, req.body);
    res.status(201).json(newAward);
  } catch (err) {
    next(err);
  }
};

const updateAward = async (req, res, next) => {
  try {
    const updatedAward = await awardService.updateAward(req.params.id, req.body);
    res.status(200).json(updatedAward);
  } catch (err) {
    next(err);
  }
};

const deleteAward = async (req, res, next) => {
  try {
    await awardService.deleteAward(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAward,
  createAward,
  updateAward,
  deleteAward,
};