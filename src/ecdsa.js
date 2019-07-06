"use strict";
const crypto = require("crypto");
const fs = require("fs");

const _HASH_ALG = "sha3-384";

/**
 * @param {String} path
 * @param {String} type
 * @returns {Boolean | module:crypto.KeyObject}
 */
function parseKey(path, type) {
    try {
        let key = fs.readFileSync(path);

        if (type === "public") {
            return crypto.createPublicKey(key);
        }

        if (type === "private") {
            return crypto.createPrivateKey(key);
        }
    } catch (e) {
        return false;
    }

    return false;
}

/**
 * @param {Buffer} plaintext
 * @param {module:crypto.KeyObject} privateKey
 * @returns {Buffer}
 */
function compute(plaintext, privateKey) {
    let signObj = crypto.createSign(_HASH_ALG);

    signObj.update(plaintext);
    return signObj.sign(privateKey);
}

/**
 * @param {Buffer} plaintext
 * @param {module:crypto.KeyObject} publicKey
 * @param {Buffer} sign
 * @returns {Boolean}
 */
function verify(plaintext, publicKey, sign) {
    let verifyObj = crypto.createVerify(_HASH_ALG);

    verifyObj.update(plaintext);
    return verifyObj.verify(publicKey, sign)
}

module.exports = {parseKey, compute, verify};

