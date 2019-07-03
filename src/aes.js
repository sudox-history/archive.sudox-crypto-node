"use strict";
const crypto = require("crypto");

const _AES_ALG = "aes-192-ctr";

const _KEY_LEN = 24;
const _IV_LEN = 16;

/**
 * @param {Buffer} plaintext
 * @param {Buffer} key
 * @param {Buffer} iv
 * @returns {Buffer | Boolean}
 */
function encrypt(plaintext, key, iv) {
    if (key.length !== _KEY_LEN || iv.length !== _IV_LEN) {
        return false;
    }

    let cipherObj = crypto.createCipheriv(_AES_ALG, key, iv);
    let res = cipherObj.update(plaintext);

    return Buffer.concat([res, cipherObj.final()]);
}

/**
 * @param {Buffer} ciphertext
 * @param {Buffer} key
 * @param {Buffer} iv
 * @returns {Buffer | Boolean}
 */
function decrypt(ciphertext, key, iv) {
    if (key.length !== _KEY_LEN || iv.length !== _IV_LEN) {
        return false;
    }

    let decipherObj = crypto.createDecipheriv(_AES_ALG, key, iv);
    let res = decipherObj.update(ciphertext);

    return Buffer.concat([res, decipherObj.final()]);
}

module.exports = {encrypt, decrypt};