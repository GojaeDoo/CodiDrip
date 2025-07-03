"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanupExpiredCodes = exports.verifyCode = exports.createVerificationCode = void 0;
// 인증번호 저장소
const verificationCodes = new Map();
// 인증번호 생성 및 저장
const createVerificationCode = (email) => {
    // 기존 인증번호가 있다면 삭제
    verificationCodes.delete(email);
    // 6자리 랜덤 숫자 생성
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    // 만료 시간 설정 (10분)
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10);
    // 인증번호 저장
    verificationCodes.set(email, {
        code,
        email,
        expiresAt,
    });
    return code;
};
exports.createVerificationCode = createVerificationCode;
// 인증번호 검증
const verifyCode = (email, code) => {
    const storedCode = verificationCodes.get(email);
    if (!storedCode) {
        return false;
    }
    // 만료 시간 체크
    if (new Date() > storedCode.expiresAt) {
        verificationCodes.delete(email);
        return false;
    }
    // 코드 일치 여부 확인
    const isValid = storedCode.code === code;
    // 인증 성공 시 저장된 코드 삭제
    if (isValid) {
        verificationCodes.delete(email);
    }
    return isValid;
};
exports.verifyCode = verifyCode;
// 주기적으로 만료된 인증번호 정리 (선택적)
const cleanupExpiredCodes = () => {
    const now = new Date();
    for (const [email, code] of verificationCodes.entries()) {
        if (now > code.expiresAt) {
            verificationCodes.delete(email);
        }
    }
};
exports.cleanupExpiredCodes = cleanupExpiredCodes;
