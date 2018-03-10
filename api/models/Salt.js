const mongoose = require('mongoose');

const makeSalt = () => {
    let salt = "";
    const possibleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789?.,!@#$%";
    const length = Math.floor(Math.random() * 10) + 1;
    for (let index = 0; index < length; index++) {
        salt += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
    }
  
    return salt;
};

const Schema = mongoose.Schema;
const SaltSchema = new Schema({
    email: {
        type: String,
        required: "Please provide the user's email"
    },
    salt: {
        type: String,
        default: makeSalt()
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
});

SaltSchema.methods.findSimilarTypes = (condition, cb) => {
    return mongoose.model('Salt').find(condition, cb);
};

SaltSchema.statics.findSimilarTypes = (condition, cb) => {
    return mongoose.model('Salt').find(condition, cb);
};

SaltSchema.statics.findSaltByEmail = (email, cb) => {
    mongoose.model('User').findOne({ email }, 'personalSalt', (err, salt) => {
        if (err || !salt) {
            return mongoose.model('Salt').findOne({ email }, 'salt', (err, salt) => {
                if (err || !salt) {
                    const Salt = mongoose.model('Salt', SaltSchema);
                    salt = new Salt({ email, salt: makeSalt() });
                    salt.save();
                    return cb(err, salt);
                }
                return cb(err, salt);
            });
        }
        return cb(err, salt);
    });
};


module.exports = mongoose.model('Salt', SaltSchema);
