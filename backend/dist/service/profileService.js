"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNicknameCheckService = exports.postUpdateProfileService = exports.getCreateProfileService = exports.getUserProfileService = exports.getProfileService = exports.getAllProfilesService = void 0;
const profileStorage_1 = require("../storage/profileStorage");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllProfilesService = async (gender) => {
    try {
        return await (0, profileStorage_1.getAllProfileStorage)(gender);
    }
    catch (error) {
        console.error("getAllProfiles error - profileService");
        throw new Error("프로필 목록을 가져오는 중 오류가 발생했습니다.");
    }
};
exports.getAllProfilesService = getAllProfilesService;
const getProfileService = async (id) => {
    try {
        return await (0, profileStorage_1.getProfileStorage)(id);
    }
    catch (error) {
        console.error("getProfileById error - profileService");
        throw new Error("프로필을 가져오는 중 오류가 발생했습니다.");
    }
};
exports.getProfileService = getProfileService;
const getUserProfileService = async (id) => {
    try {
        return await (0, profileStorage_1.getUserProfileStorage)(id);
    }
    catch (error) {
        console.error("getUserProfileById error - profileService");
        throw new Error("프로필을 가져오는 중 오류가 발생했습니다.");
    }
};
exports.getUserProfileService = getUserProfileService;
const getCreateProfileService = async (height, weight, gender, nickname, profileImage, userId, profileAbout) => {
    try {
        const result = await (0, profileStorage_1.getCreateProfileStorage)(height, weight, gender, nickname, profileImage, userId, profileAbout);
        return result;
    }
    catch (error) {
        console.error("createProfile error - profileService:", error);
        throw new Error("프로필을 생성하는 중 오류가 발생했습니다.");
    }
};
exports.getCreateProfileService = getCreateProfileService;
const postUpdateProfileService = async (height, weight, gender, nickname, profileImage, userId, profileAbout) => {
    try {
        const updatedProfile = await (0, profileStorage_1.postUpdateProfileStorage)(height, weight, gender, nickname, profileImage, userId, profileAbout);
        return {
            success: true,
            data: updatedProfile,
        };
    }
    catch (error) {
        console.error("프로필 수정 중 오류 발생:", error);
        throw error;
    }
};
exports.postUpdateProfileService = postUpdateProfileService;
const getNicknameCheckService = async (nickname) => {
    try {
        return await (0, profileStorage_1.getFindNickNameCheckStorage)(nickname);
    }
    catch (error) {
        console.error("getNicknameCheckService error - profileService");
        throw new Error("닉네임 중복확인 중 오류가 발생했습니다.");
    }
};
exports.getNicknameCheckService = getNicknameCheckService;
