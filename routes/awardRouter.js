const { Router } = require('express');
const router = Router();
const awardService = require('../services/awardService');
const UserModel = require('../db/model/userModel');
const ServiceError = require('../errors/serviceError');     //호출한 awawrdService에다가 next(err)로 에러 전달

// award 데이터 추가 C
router.post('/award', async (req, res, next) => {
    try {
        const newAward = await awardService.addAward({ ...req.body, userId: req.user._id });
        res.status(201).json(newAward); 
    } catch (err) {
        next(err);
    }
});

// 사용자 ID로 award 데이터 조회 R
router.get('/award', async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.user._id);
        const award = await awardService.getAwardByUserId(user._id);
        res.status(200).json(award);
    } catch (err) {
        next(err);
    }
});

// award 데이터 업데이트 U
router.put('/award/:id', async (req, res, next) => {
    try {
        const updatedAward = await awardService.updateAward(req.params.id, req.body);
        res.status(200).json(updatedAward); 
    } catch (err) {
        next(err);
    }
});

// award 데이터 삭제 D
router.delete('/award/:id', async (req, res, next) => {
    try {
        await awardService.deleteAward(req.params.id);
        res.status(204).end();
    } catch (err) {
        next(err);
    }
});

module.exports = router;
