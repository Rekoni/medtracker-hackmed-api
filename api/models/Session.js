const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const SessionSchema = new Schema({
    userId: {
        type: String,
        required: "Please provide a user for the session"
    },
    token: {
        type: String,
        required: "Please provide a token for the session"
    },
    userAddress: {
        type: String,
        required: "Please provide the user's address"
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
});

SessionSchema.statics.findSimilarTypes = (condition, cb) => {
    return mongoose.model('Session').find(condition, cb);
};

SessionSchema.statics.findExistingSession = (userId, token, userAddress, cb) => {
    // Find the required session
    mongoose.model('Session').findOne({ userId, token, userAddress },
        (err, session) => {
            if (err || !session) {
                return cb(err, null);
            }
            return cb(null, session);
    });
};

module.exports = mongoose.model('Session', SessionSchema);
