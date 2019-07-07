"use strict";
const crypto = require("crypto");
const consts = require("../consts");

const _AES_KEY_LEN = parseInt(consts.AES_ALG.match(/\d+/)[0]) / 8;

let _ecdhObjArr = [];

/**
 * @returns {{index: Number, publicKey: Buffer}}
 */
function start() {
    let ecdhObj = crypto.createECDH(consts.ECDH_CURVE_NAME);

    let index = _ecdhObjArr.push(ecdhObj);
    return {index, publicKey: ecdhObj.generateKeys()};
}

/**
 * @param {Number} index
 * @param {Buffer} publicKey
 * @returns {Boolean | Buffer}
 */
function finish(index, publicKey) {
    let secretKey;

    try {
        secretKey = _ecdhObjArr[index]
            .computeSecret(publicKey)
            .slice(0, _AES_KEY_LEN);
    } catch (e) {
        return false;
    }

    _ecdhObjArr.splice(index, 1);
    return secretKey;
}

module.exports = {start, finish};