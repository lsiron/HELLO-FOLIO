const { model } = require('mongoose');
const CommentSchema = require('../schemas/commentSchema');  
const CommentModel = model('Comment', CommentSchema); 

module.exports = CommentModel;