"use strict";
const crypto = require("crypto");
const consts = require("../consts");

const _RAND_DIVIDER = 256 ** consts.RAND_LVL;

/**
 * @param {Number} min
 * @param {Number} max
 * @returns {Number}
 */
function genNum(min, max) {
    let num = crypto
        .randomBytes(consts.RAND_LVL)
        .readUIntLE(0, consts.RAND_LVL);

    return Math.floor(num / _RAND_DIVIDER * (max - min) + min)
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