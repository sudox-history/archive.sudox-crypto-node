"use strict";
const crypto = require("crypto");

const _EC_NAME = "secp384r1";

let _ecdhObjArr = [];

/**
 * @returns {{index: Number, publicKey: Buffer}}
 */
function start() {
    let ecdhObj = crypto.createECDH(_EC_NAME);

    let index = _ecdhObjArr.push(ecdhObj);
    return {index, publicKey: ecdhObj.generateKeys()};
}

/**
 * @param {Number} index
 * @param {Buffer} publicKey
 * @param {Number} len
 * @returns {Boolean | Buffer}
 */
function finish(index, publicKey, len) {
    let secretKey;

    try {
        secretKey = _ecdhObjArr[index]
            .computeSecret(publicKey)
            .slice(0, len);
    } catch (e) {
        return false;
    }

    _ecdhObjArr.splice(index, 1);
    return secretKey;
}

module.exports = {start, finish};