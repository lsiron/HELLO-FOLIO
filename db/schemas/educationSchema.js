const mongoose = require('mongoose');

const EducationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  school: {
    type: String,
    required: true,
  },
  major: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
    required: true,
    enum: ['고등학교', '학사', '석사', '박사']
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date
  },
},
{
  collection: 'education',
  timestamps: true,
}  
);

module.exports = EducationSchema;