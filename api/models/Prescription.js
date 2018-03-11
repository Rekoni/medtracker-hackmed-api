const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const PrescriptionSchema = new Schema({
  prescriptionName: {
    type: String,
  },
  startTime: {
    type: Date,
  },
  endTime: {
    type: Date,
  },
  frequency: {
    type: String
  },
  reminder: {
    type: String
  },

});

PrescriptionSchema.methods.findSimilarTypes = (condition, cb) => {
  return mongoose.model('Prescription').find(condition, cb);
};

PrescriptionSchema.statics.findSimilarTypes = (condition, cb) => {
  return mongoose.model('Prescription').find(condition, cb);
};

PrescriptionSchema.statics.findPrescription = (condition, cb) => {
  return mongoose.model('Prescription').findOne(condition, cb);
};


module.exports = mongoose.model('Prescription', PrescriptionSchema);
