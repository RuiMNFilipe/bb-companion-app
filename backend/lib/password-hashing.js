"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = hashPassword;
exports.validatePassword = validatePassword;
const bcrypt_ts_1 = require("bcrypt-ts");
const SALT_ROUNDS = 15;
async function hashPassword(plainTxtPw) {
    return await (0, bcrypt_ts_1.hash)(plainTxtPw, SALT_ROUNDS);
}
async function validatePassword(plainTxtPw, hashedPw) {
    return await (0, bcrypt_ts_1.compare)(plainTxtPw, hashedPw);
}
//# sourceMappingURL=password-hashing.js.map