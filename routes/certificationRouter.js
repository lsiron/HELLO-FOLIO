const { Router } = require('express');
const router = Router();
const certificationService = require('../services/certificationService');
const UserModel = require('../db/model/userModel');
const ServiceError = require('../errors/serviceError');

// C
router.post('/certification', async (req, res, next) => {
  try {
    const newCertification = await certificationService.addCertification({ ...req.body, userId: req.user._id });
    res.status(201).json(newCertification);
  } catch (error) {
    next(err);
  }
});

// R
router.get('/certification', async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.user._id);
    const certification = await certificationService.getCertificationByUserId(user._id);
    res.status(200).json(certification);
  } catch (err) {
    next(err)
  }
});


// U
router.put('/certification/:id', async (req, res, next) => {
  try {
    const updatedCertification = await certificationService.updateCertification(req.params.id, req.body);
    res.status(200).json(updatedCertification);
  } catch (err) {
    next(err)
  }
});

// D
router.delete('/certification/:id', async (req, res, next) => {
  try {
    await certificationService.deleteCertification(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err)
  }
});

module.exports = router;
