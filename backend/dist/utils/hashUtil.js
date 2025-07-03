"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.hashPassword = void 0;
// src/utils/hashUtil.ts
const bcrypt_1 = __importDefault(require("bcrypt"));
// 비밀번호 해싱 함수
const hashPassword = async (password) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt_1.default.hash(password, saltRounds);
    return hashedPassword;
};
exports.hashPassword = hashPassword;
// 비밀번호 검증 함수
const comparePassword = async (hashedPassword, password) => {
    const result = await bcrypt_1.default.compare(password, hashedPassword);
    return result;
};
exports.comparePassword = comparePassword;
