"use strict";
const crypto = require("crypto");
const rand = require("./rand");
const consts = require("../consts");

/**
 * @param {Buffer} plaintext
 * @returns {Buffer}
 */
function add(plaintext) {
    let saltLen = rand.genNum(consts.SALT_MIN_LEN, consts.SALT_MAX_LEN);

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