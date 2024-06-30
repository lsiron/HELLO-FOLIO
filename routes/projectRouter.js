const { Router } = require('express');
const router = Router();
const projectController = require('../controllers/projectController');

router.get('/project', projectController.getProject);
router.post('/project', projectController.createProject);
router.put('/project/:id', projectController.updateProject);
router.delete('/project/:id', projectController.deleteProject);

module.exports = router;
