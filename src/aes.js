"use strict";
const crypto = require("crypto");

const _AES_ALG = "aes-192-ctr";

/**
 * @param {Buffer} plaintext
 * @param {Buffer} key
 * @param {Buffer} iv
 * @returns {Boolean | Buffer}
 */
function encrypt(plaintext, key, iv) {
    let cipherObj;

    try {
        cipherObj = crypto.createCipheriv(_AES_ALG, key, iv);
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
        decipherObj = crypto.createDecipheriv(_AES_ALG, key, iv);
    } catch (e) {
        return false;
    }

    let res = decipherObj.update(ciphertext);
    decipherObj.final();

    return res;
}

module.exports = {encrypt, decrypt};