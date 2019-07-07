"use strict";
const crypto = require("crypto");
const consts = require("../consts");

/**
 * @param {Buffer} plaintext
 * @param {Buffer} key
 * @param {Buffer} iv
 * @returns {Boolean | Buffer}
 */
function encrypt(plaintext, key, iv) {
    let cipherObj;

    try {
        cipherObj = crypto.createCipheriv(consts.AES_ALG, key, iv);
    } catch (e) {
        return false;
    }

    let res = cipherObj.update(plaintext);
    cipherObj.final();

    return res;
}

/**
 * @param {Buffer} ciphertext
 * @param {Buffer} key
 * @param {Buffer} iv
 * @returns {Boolean | Buffer}
 */
function decrypt(ciphertext, key, iv) {
    let decipherObj;

    try {
        decipherObj = crypto.createDecipheriv(consts.AES_ALG, key, iv);
    } catch (e) {
        return false;
    }

    let res = decipherObj.update(ciphertext);
    decipherObj.final();

    return res;
}

module.exports = {encrypt, decrypt};