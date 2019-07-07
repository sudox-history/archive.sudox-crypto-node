"use strict";
const AES_ALG = "aes-192-ctr";

const ECDH_CURVE_NAME = "secp384r1";

const ECDSA_CURVE_NAME = null; // Curve name is inside private/public key
const ECDSA_HASH_ALG = "sha3-384";

const HMAC_HASH_ALG = "sha3-384";

const RAND_LVL = 4;

const SALT_MIN_LEN = 16;
const SALT_MAX_LEN = 32;

module.exports = {
    AES_ALG,

    ECDH_CURVE_NAME,

    ECDSA_CURVE_NAME,
    ECDSA_HASH_ALG,

    HMAC_HASH_ALG,

    RAND_LVL,

    SALT_MIN_LEN,
    SALT_MAX_LEN
};