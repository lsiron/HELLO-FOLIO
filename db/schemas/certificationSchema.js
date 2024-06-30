const mongoose = require('mongoose');

const CertificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    getDate: {
      type: Date,
      required: true,
    },
  },
  {
    collection: 'certifications',
    timestamps: true,
  }
);

module.exports = CertificationSchema;
