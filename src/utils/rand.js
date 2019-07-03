"use strict";
const crypto = require("crypto");

const _RAND_NUM_BYTES_COUNT = 3;
const _RAND_MAX_NUM = 256 ** _RAND_NUM_BYTES_COUNT;

/**
 * @param {Number} min
 * @param {Number} max
 * @returns {Number}
 */
function genNum(min, max) {
    let num = crypto
        .randomBytes(_RAND_NUM_BYTES_COUNT)
        .readUIntLE(0, _RAND_NUM_BYTES_COUNT);

    return Math.floor(num / _RAND_MAX_NUM * (max - min) + min)
}

/**
 * @param {Number} len
 * @returns {String}
 */
function genStr(len) {
    return crypto
        .randomBytes(len)
        .toString("hex");
}

/**
 * @param {Number} len
 * @returns {Buffer}
 */
function genBuf(len) {
    return crypto.randomBytes(len);
}

module.exports = {genNum, genStr, genBuf};