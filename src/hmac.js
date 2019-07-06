"use strict";
const crypto = require("crypto");

const _HASH_ALG = "sha3-384";

/**
 * @param {Buffer} plaintext
 * @param {Buffer} key
 * @returns {Buffer}
 */
function compute(plaintext, key) {
    let hmacObj = crypto.createHmac(_HASH_ALG, key);

    hmacObj.update(plaintext);
    return hmacObj.digest();
}

/**
 * @param {Buffer} plaintext
 * @param {Buffer} key
 * @param {Buffer} hmac
 * @returns {Boolean}
 */
function verify(plaintext, key, hmac) {
    let res;

    try {
        res = crypto.timingSafeEqual(compute(plaintext, key), hmac);
    } catch (e) {
        return false;
    }

    return res;
}

module.exports = {compute, verify};