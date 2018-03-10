'use strict';

const JWT = require('jsonwebtoken');
const CryptoJS = require("crypto-js");

exports.encryptUserData = (email, password) => {
    email = this.encryptEmail(email);
    password = this.encryptPassword(password);
    return { email, password };
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

exports.authenticationDonePayload = (payload) => {
    payload.token = JWT.sign(payload, process.env.TOKEN_KEY, {
        expiresIn: 86400 // 24 hours
    });
    return payload;
};
