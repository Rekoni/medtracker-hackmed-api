const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  email: {
    type: String,
    required: "Please provide the user's email"
  },
  password: {
    type: String,
    required: "Please provide the user's password"
  },
  phoneNumber: {
    type: String
  },
  personalSalt: {
    type: String
  },
  prescriptionList: [],
  Created_date: {
    type: Date,
    default: Date.now
  },
});

UserSchema.methods.findSimilarTypes = (condition, cb) => {
  return mongoose.model('User').find(condition, cb);
};

UserSchema.statics.findSimilarTypes = (condition, cb) => {
  return mongoose.model('User').find(condition, cb);
};

UserSchema.statics.findUser = (condition, cb) => {
  return mongoose.model('User').findOne(condition, cb);
};

UserSchema.statics.findUserByToken = (token, cb) => {
  const Session = require('./Session');

  Session.findOne({ token }, (err, session) => {
    if (err || !session) {
      return cb(err, null);
    }
    const User = mongoose.model('User', UserSchema);
    User.findById(session.userId, (err, user) => {
      if (err || !user) {
        return cb(err, null);
      }
      return cb(null, user);
    });
  });
};

module.exports = mongoose.model('User', UserSchema);
