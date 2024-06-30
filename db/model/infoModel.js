const { model } = require('mongoose');
const InfoSchema = require('../schemas/infoSchema');  
const InfoModel = model('Info', InfoSchema); 

module.exports = InfoModel;