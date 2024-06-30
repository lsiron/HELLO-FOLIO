const { model } = require('mongoose');
const ProjectSchema = require('../schemas/projectSchema');  
const ProjectModel = model('Project', ProjectSchema); 

module.exports = ProjectModel;