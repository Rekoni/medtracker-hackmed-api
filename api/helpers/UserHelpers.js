'use strict';

const JWT = require('jsonwebtoken');
const CryptoJS = require("crypto-js");

exports.encryptUserData = (email, password, phoneNumber) => {
    email = this.encryptEmail(email);
    password = this.encryptPassword(password);
    phoneNumber = this.encrypt(phoneNumber);
    return { email, password, phoneNumber };
};

exports.encryptEmail = (email) => {
    email = CryptoJS.MD5(email).toString(CryptoJS.enc.Base64);
    return email;
};

exports.encryptPassword = (password) => {
    password = CryptoJS.HmacSHA256(password, process.env.PASSWORD_HASH_KEY)
        .toString(CryptoJS.enc.Base64);
    return password;
};

var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';

exports.encrypt = (text) => {
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}

exports.decrypt = (text) => {
  var decipher = crypto.createDecipher(algorithm,password)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}

exports.authenticationDonePayload = (payload) => {
    payload.token = JWT.sign(payload, process.env.TOKEN_KEY, {
        expiresIn: 86400 // 24 hours
    });
    return payload;
};
