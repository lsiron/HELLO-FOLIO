const { model } = require('mongoose');
const AwardSchema = require('../schemas/awardSchema');  
const AwardModel = model('Award', AwardSchema); 

module.exports = AwardModel;