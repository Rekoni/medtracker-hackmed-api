const Salt = require('../models/Salt');
const User = require('../models/User');
const Session = require('../models/Session');
const resHelpers = require('./ResponseHelpers');


exports.cleanupSalts = () => {
    Salt.findSimilarTypes({}, (err, salts) => {
        if (err) {
            return;
        }
        salts.forEach(salt => {
            // Calculating the age of the salt in minutes
            const age = Math.ceil(((new Date()).getTime() - salt.createdDate.getTime())
                / (1000 * 60));
            if (age > 30) {
                salt.remove();
            }
        });
    });
};

exports.cleanupSessions = () => {
    Session.findSimilarTypes({}, (err, sessions) => {
        if (err) {
            return;
        }
        sessions.forEach(session => {
            // Calculating the age of the salt in minutes
            const age = Math.ceil(((new Date()).getTime() - session.createdDate.getTime())
                / (1000 * 60));
            if (age > 1440) {
                session.remove();
            }
        });
    });
};

exports.createSession = (userId, token, userAddress) => {
    // Check if a session for this user already exists, create a new session if it doesn't
    Session.findExistingSession(userId, token, userAddress, (err, session) => {
        if (err || !session) {
            const session = new Session({ userId, token, userAddress });
            session.save();
            return;
        }
    });
};
