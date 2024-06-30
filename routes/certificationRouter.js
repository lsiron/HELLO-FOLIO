const { Router } = require('express');
const router = Router();
const certificationController = require('../controllers/certificationController');

router.get('/certification', certificationController.getCert);
router.post('/certification', certificationController.createCert);
router.put('/certification/:id', certificationController.updateCert);
router.delete('/certification/:id', certificationController.deleteCert);

module.exports = router;