"use strict";
const crypto = require("crypto");
const rand = require("./rand");

const _SALT_MIN_LEN = 16;
const _SALT_MAX_LEN = 32;

/**
 * @param {Buffer} plaintext
 * @returns {Buffer}
 */
function add(plaintext) {
    let saltLen = rand.genNum(_SALT_MIN_LEN, _SALT_MAX_LEN);

    let salt = crypto.randomBytes(saltLen + 1);
    salt[saltLen] = saltLen;

    return Buffer.concat([plaintext, salt])
}

/**
 * @param {Buffer} plaintext
 * @returns {Buffer}
 */
function remove(plaintext) {
    let saltLen = plaintext[plaintext.length - 1];

    return plaintext.slice(0, plaintext.length - saltLen - 1);
}

module.exports = {add, remove};