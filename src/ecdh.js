"use strict";
const crypto = require("crypto");

const _EC_NAME = "secp384r1";

/**
 * @constructor
 */
function ECDH() {
    this._ecdhObj = crypto.createECDH(_EC_NAME);

    // Instantly generating keys
    this._ecdhObj.generateKeys();
}

/**
 * @returns {Buffer}
 */
ECDH.prototype.getPublicKey = function () {
    return this._ecdhObj.getPublicKey();
};

/**
 * @param {Buffer} publicKey
 * @returns {Boolean | Buffer}
 */
ECDH.prototype.computeSecretKey = function (publicKey) {
    try {
        // noinspection ES6ConvertVarToLetConst
        var secretKey = this._ecdhObj
            .computeSecret(publicKey)
            .slice(0, 24);
    } catch (e) {
        return false;
    }

    return secretKey;
};

module.exports = ECDH;