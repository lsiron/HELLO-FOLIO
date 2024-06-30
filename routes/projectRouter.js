const { Router } = require('express');
const router = Router();
const projectService = require('../services/projectService');
const UserModel = require('../db/model/userModel');
const ServiceError = require('../errors/serviceError');


// project 데이터 추가 C
router.post('/project', async (req, res, next) => {
  try {
      const newProject = await projectService.addProject({ ...req.body, userId: req.user._id });
      res.status(201).json(newProject);
  } catch (err) {
    next(err);
  }
});

// 사용자 ID로 project 데이터 조회 R
router.get('/project', async (req, res, next) => {
  try {
      const user = await UserModel.findById(req.user._id);
      const project = await projectService.getProjectByUserId(user._id);
      res.status(200).json(project);
  } catch (err) { 
    next(err);
  }
});

// project 데이터 업데이트 U
router.put('/project/:id', async (req, res, next) => {
  try {
      const updatedProject = await projectService.updateProject(req.params.id, req.body);
      res.status(200).json(updatedProject);
  } catch (err) {
    next(err);
  }
});

// project 데이터 삭제 D
router.delete('/project/:id', async (req, res, next) => {
  try {
      await projectService.deleteProject(req.params.id);
      res.status(204).end();
  } catch (err) {
    next(err);
  }
});
  
  module.exports = router;