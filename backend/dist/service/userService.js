"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUserAdminStatusService = exports.getFollowingService = exports.getFollowersService = exports.toggleFollowService = exports.checkFollowStatusService = exports.postResetPasswordService = exports.postVerifyPasswordCodeService = exports.postLoginUserService = exports.postUserJoinService = exports.getFindPasswordCheckService = exports.getFindIdService = exports.getEmailOverlappingCheckService = exports.getIdOverlappingCheckService = exports.selectUserService = exports.getAllUsers = void 0;
// src/service/userService.ts
const userStorage_1 = require("../storage/userStorage");
const hashUtil_1 = require("../utils/hashUtil");
const jwtUtil_1 = require("../utils/jwtUtil");
const emailUtil_1 = require("../utils/emailUtil");
const verificationService_1 = require("./verificationService");
const verificationService_2 = require("./verificationService");
const getAllUsers = async () => {
    try {
        const user = await (0, userStorage_1.getUsersFromDB)();
        return user;
    }
    catch (error) {
        console.error("getAllUsers error - userService");
    }
};
exports.getAllUsers = getAllUsers;
const selectUserService = async ({ user_id }) => {
    try {
        const selectUser = await (0, userStorage_1.selectUserStorage)(user_id);
        if (!selectUser) {
            throw new Error("사용자를 찾을 수 없습니다.");
        }
        return selectUser;
    }
    catch (error) {
        console.error("selectUserService error - userService");
        throw error;
    }
};
exports.selectUserService = selectUserService;
const getIdOverlappingCheckService = async ({ user_id }) => {
    try {
        const idCheck = await (0, userStorage_1.getIdOverlappingCheckStorage)(user_id);
        return idCheck;
    }
    catch (error) {
        console.error("idOverlappingCheck error - userService");
    }
};
exports.getIdOverlappingCheckService = getIdOverlappingCheckService;
const getEmailOverlappingCheckService = async ({ user_email }) => {
    try {
        const emailCheck = await (0, userStorage_1.getEmailOverlappingCheckStorage)(user_email);
        return emailCheck;
    }
    catch (error) {
        console.error("emailOverlappingCheck error - userService");
    }
};
exports.getEmailOverlappingCheckService = getEmailOverlappingCheckService;
const getFindIdService = async ({ user_email }) => {
    try {
        const findId = await (0, userStorage_1.getFindIdStorage)(user_email);
        return findId;
    }
    catch (error) {
        console.error("findIdCheck error - userService");
    }
};
exports.getFindIdService = getFindIdService;
const getFindPasswordCheckService = async ({ user_id, user_email, }) => {
    try {
        const findPassword = await (0, userStorage_1.getFindPasswordCheckStorage)(user_id, user_email);
        // DB에서 일치하는 사용자가 있는지 확인
        if (findPassword && findPassword.length > 0) {
            // 인증번호 생성
            const verificationCode = (0, verificationService_1.createVerificationCode)(user_email);
            // 이메일 발송
            await (0, emailUtil_1.sendVerificationEmail)(user_email, verificationCode);
            return {
                success: true,
                message: "인증번호가 이메일로 발송되었습니다.",
            };
        }
        return {
            success: false,
            message: "일치하는 사용자 정보가 없습니다.",
        };
    }
    catch (error) {
        console.error("findPasswordCheck error - userService");
        throw error;
    }
};
exports.getFindPasswordCheckService = getFindPasswordCheckService;
const postUserJoinService = async (user) => {
    if (!user.user_password) {
        throw new Error("비밀번호 해싱 서비스 에러");
    }
    const hashedPassword = await (0, hashUtil_1.hashPassword)(user.user_password);
    return (0, userStorage_1.postUserJoinStorage)({ ...user, user_password: hashedPassword });
};
exports.postUserJoinService = postUserJoinService;
const postLoginUserService = async (user_id, user_password) => {
    try {
        const user = await (0, userStorage_1.postLoginUserStorage)(user_id);
        if (!user) {
            throw new Error("아이디가 존재하지 않습니다. 다시 확인해주세요.");
        }
        const isPasswordValid = await (0, hashUtil_1.comparePassword)(user.user_password, user_password);
        if (!isPasswordValid) {
            throw new Error("비밀번호가 일치하지 않습니다. 다시 확인해주세요.");
        }
        // 토큰 생성
        const token = (0, jwtUtil_1.generateToken)(user.user_id);
        return {
            user,
            token,
        };
    }
    catch (error) {
        console.error("loginUser error - userService");
        throw error;
    }
};
exports.postLoginUserService = postLoginUserService;
// 인증번호 검증 서비스
const postVerifyPasswordCodeService = async (email, code) => {
    try {
        const isValid = (0, verificationService_2.verifyCode)(email, code);
        if (isValid) {
            return {
                success: true,
                message: "인증이 완료되었습니다.",
            };
        }
        return {
            success: false,
            message: "인증번호가 일치하지 않거나 만료되었습니다.",
        };
    }
    catch (error) {
        console.error("verifyPasswordCode error - userService");
        throw error;
    }
};
exports.postVerifyPasswordCodeService = postVerifyPasswordCodeService;
const postResetPasswordService = async (email, password) => {
    try {
        const user = await (0, userStorage_1.findUserByEmailDB)(email);
        if (!user) {
            throw new Error("존재하지 않는 이메일입니다.");
        }
        const hashedPassword = await (0, hashUtil_1.hashPassword)(password);
        await (0, userStorage_1.postUpdatePasswordStorage)(email, hashedPassword);
        return { success: true, message: "비밀번호가 재설정되었습니다." };
    }
    catch (error) {
        throw error;
    }
};
exports.postResetPasswordService = postResetPasswordService;
// 팔로우 상태 확인 서비스
const checkFollowStatusService = async (followerId, followeeId) => {
    try {
        const isFollowing = await (0, userStorage_1.checkFollowStatusDB)(followerId, followeeId);
        return { isFollowing };
    }
    catch (error) {
        console.error("checkFollowStatusService error - userService");
        throw error;
    }
};
exports.checkFollowStatusService = checkFollowStatusService;
// 팔로우 토글 서비스
const toggleFollowService = async (followerId, followeeId) => {
    try {
        // 자기 자신을 팔로우하려는 경우 방지
        if (followerId === followeeId) {
            throw new Error("자기 자신을 팔로우할 수 없습니다.");
        }
        const result = await (0, userStorage_1.toggleFollowDB)(followerId, followeeId);
        return result;
    }
    catch (error) {
        console.error("toggleFollowService error - userService");
        throw error;
    }
};
exports.toggleFollowService = toggleFollowService;
// 팔로워 목록 가져오기 서비스
const getFollowersService = async (userId) => {
    try {
        const followers = await (0, userStorage_1.getFollowersDB)(userId);
        return followers;
    }
    catch (error) {
        console.error("getFollowersService error - userService");
        throw error;
    }
};
exports.getFollowersService = getFollowersService;
// 팔로잉 목록 가져오기 서비스
const getFollowingService = async (userId) => {
    try {
        const following = await (0, userStorage_1.getFollowingDB)(userId);
        return following;
    }
    catch (error) {
        console.error("getFollowingService error - userService");
        throw error;
    }
};
exports.getFollowingService = getFollowingService;
// 사용자 관리자 상태 확인 서비스
const checkUserAdminStatusService = async (userId) => {
    try {
        const user = await (0, userStorage_1.checkUserAdminStatus)(userId);
        return user;
    }
    catch (error) {
        console.error("checkUserAdminStatusService error - userService");
        throw error;
    }
};
exports.checkUserAdminStatusService = checkUserAdminStatusService;
