const { Router } = require('express');
const router = Router();
const educationController = require('../controllers/educationController');

router.get('/education', educationController.getEdu);
router.post('/education', educationController.createEdu);
router.put('/education/:id', educationController.updateEdu);
router.delete('/education/:id', educationController.deleteEdu);

module.exports = router;