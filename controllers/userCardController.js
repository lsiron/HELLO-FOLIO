const userCardService = require('../services/userCardService');

const uploadImage = async (req, res, next) => {
  try {
    await userCardService.uploadImage(req);
    res.redirect('/myPage');
  } catch (err) {
    next(err);
  }
};

const deleteImage = async (req, res, next) => {
  try {
    await userCardService.deleteImage(req.user.email);
    res.redirect('/myPage');
  } catch (err) {
    next(err);
  }
};

const newInfo = async (req, res, next) => {
  try {
    const newInfo = await userCardService.newInfo(req.user._id, req.body.content);
    res.json({ data: newInfo });
  } catch (err) {
    next(err);
  }
};

const updateInfo = async (req, res, next) => {
  try {
    const updateInfo = await userCardService.updateInfo(req.params.id, req.body.content);
    res.json({ data: updateInfo });
  } catch (err) {
    next(err);
  }
};

const updateName = async (req, res, next) => {
  try {
    const updatedName = await userCardService.updateName(req.params.id, req.body.name);
    res.json({ name: updatedName });
  } catch (err) {
    next(err);
  }
};

const updatePw = async (req, res, next) => {
  try {
    const updatedPw = await userCardService.updatePw(req.params.id, req.body.currentPassword, req.body.newPassword);
    res.json({ password: updatedPw });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  upload: userCardService.upload,
  uploadImage,
  deleteImage,
  newInfo,
  updateInfo,
  updateName,
  updatePw,
};
