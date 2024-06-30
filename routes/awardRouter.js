const { Router } = require('express');
const router = Router();
const awardController = require('../controllers/awardController');

router.get('/award', awardController.getAward);
router.post('/award', awardController.createAward);
router.put('/award/:id', awardController.updateAward);
router.delete('/award/:id', awardController.deleteAward);

module.exports = router;