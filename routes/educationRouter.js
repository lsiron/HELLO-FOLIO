const { Router } = require('express');
const router = Router();
const educationService = require('../services/educationService');
const UserModel = require('../db/model/userModel');
const ServiceError = require('../errors/serviceError');

// education 데이터 추가 C
router.post('/education', async (req, res, next) => {
    try {
        const newEducation = await educationService.addEducation({ ...req.body, userId: req.user._id });
        res.status(201).json(newEducation);
    } catch (err) {
        next(err);
    }
});

// 사용자 ID로 education 데이터 조회 R
router.get('/education', async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.user._id);
        const education = await educationService.getEducationByUserId(req.user._id);
        res.status(200).json(education);
    } catch (err) {
        next(err);
    }
});

// education 데이터 업데이트 U
router.put('/education/:id', async (req, res, next) => {
    try {
        const updatedEducation = await educationService.updateEducation(req.params.id, req.body);
        res.status(200).json(updatedEducation);
    } catch (err) {
        next(err);
    }
});

// education 데이터 삭제 D
router.delete('/education/:id', async (req, res, next) => {
    try {
        await educationService.deleteEducation(req.params.id);
        res.status(204).end();
    } catch (err) {
        next(err);
    }
});

module.exports = router;