const JWT = require('jsonwebtoken');
const Salt = require('../../models/Salt');
const User = require('../../models/User');
const Session = require('../../models/Session');
const dbHelpers = require('../../helpers/DatabaseHelpers');
const resHelpers = require('../../helpers/ResponseHelpers');
const userHelpers = require('../../helpers/UserHelpers');
// var session = require('express-session');

exports.getSalt = (req, res) => {
    const email = userHelpers.encryptEmail(req.body.email);
    if (!email) {
        return res.send(resHelpers.error("Please provide the user's email!"));
    }
    Salt.findSaltByEmail(email, (err, salt) => {
        if (err) {
            return res.send(resHelpers.error("Could not find salt for given user!"));
        }
        res.send(resHelpers.ok({ salt: salt.salt || salt.personalSalt, email: req.body.email }));
    });
    dbHelpers.cleanupSalts();
};

exports.login = (req, res) => {
    const { email, password } = userHelpers.encryptLoginData(req.body.email, req.body.password);
    User.findUser({ email, password }, (err, user) => {
        if (err || !user) {
            return res.send({ error: true, message: err || "Could not find user!" });
        }
      return res.send(resHelpers.ok("User logged in!"));
    });
    dbHelpers.cleanupSessions();
};

exports.register = (req, res) => {
    const { email, password, phoneNumber } = userHelpers.encryptRegisterData(req.body.email, req.body.password, req.body.phoneNumber);

    Salt.findSaltByEmail(email, (err, salt) => {
        if (err || !salt) {
            return res.send(resHelpers.error("Could not register!"));
        }
        User.findUser({ email }, (err, user) => {
            if (err || user) {
                // Error occured or such a user already exists
                return res.send(resHelpers.error(err || "User already exists!"));
            }
            user = new User({ email, password, personalSalt: salt.salt, phoneNumber });
            user.save();
            // Remove the salt from the salts collection, it was stored in the user's object
            salt.remove();


            return res.send(resHelpers.ok("User created"));

        });
    });
    dbHelpers.cleanupSessions();
};

exports.testLogin = (req, res) => {
    res.send(resHelpers.ok("User found!"));
    dbHelpers.cleanupSessions();
};

exports.authenticate = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    console.log(token);
    if (token) {
        // Verify token
        JWT.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
            if (err) {
                return res.send(resHelpers.error("Could not find user 1!"));
            }
            req.decoded = decoded;
            // Find the session to check if the sender has the same address
            // as the user of this session
            Session.findOne({ token }, (err, session) => {
                if (err || session.userAddress !== String(req.connection.remoteAddress)) {
                    return res.send(resHelpers.error(err || "Could not find user 2!"));
                }
                // Find the user with the session
                User.findById(session.userId, (err, user) => {
                    if (err || !user) {
                        return res.send(resHelpers.error(err || "Could not find user 3!"));
                    }
                    req.body.user = user;
                    next();
                });
            });
        });
    } else {
        return res.status(403).send(resHelpers.error("No token provided!"));
    }
};

exports.logout = (req, res) => {
    const token = req.body.token;

    Session.findOne({ token }, (err, session) => {
        if (err) {
            res.send(resHelpers.error(err));
        }
        session.remove();
        res.send(resHelpers.ok("User logged out successfully!"));
    });
};
