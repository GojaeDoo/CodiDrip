"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadProfileImageController = exports.getNicknameCheckController = exports.postUpdateProfileController = exports.getCreateProfileController = exports.getUserProfileController = exports.getProfileController = exports.getProfilesController = void 0;
const profileService_1 = require("../service/profileService");
const storageService_1 = require("../service/storageService");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// 모든 프로필 가져오기
const getProfilesController = async (req, res) => {
    try {
        const gender = req.query.gender;
        const profiles = await (0, profileService_1.getAllProfilesService)(gender);
        res.json(profiles);
    }
    catch (error) {
        res.status(500).json({ error: "getProfiles 500error - profileController" });
    }
};
exports.getProfilesController = getProfilesController;
// 특정 프로필 가져오기
const getProfileController = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || typeof id !== "string") {
            res
                .status(400)
                .json({ error: "getProfile 400error - profileController" });
            return;
        }
        const profile = await (0, profileService_1.getProfileService)(id);
        res.json(profile);
    }
    catch (error) {
        res.status(500).json({ error: "getProfile 500error - profileController" });
    }
};
exports.getProfileController = getProfileController;
const getUserProfileController = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || typeof id !== "string") {
            res
                .status(400)
                .json({ error: "getUserProfile 400error - profileController" });
            return;
        }
        const profile = await (0, profileService_1.getUserProfileService)(id);
        if (!profile) {
            res.status(404).json({ error: "프로필을 찾을 수 없습니다." });
            return;
        }
        res.json(profile);
    }
    catch (error) {
        res
            .status(500)
            .json({ error: "getUserProfile 500error - profileController" });
    }
};
exports.getUserProfileController = getUserProfileController;
const getCreateProfileController = async (req, res, next) => {
    try {
        const { userId, height, weight, gender, nickname, profileImage, profileAbout } = req.body;
        if (!profileImage) {
            return res.status(400).json({ error: "프로필 이미지가 필요합니다." });
        }
        const profile = await (0, profileService_1.getCreateProfileService)(height, weight, gender, nickname, profileImage, userId, profileAbout);
        res.status(200).json(profile);
    }
    catch (error) {
        next(error);
    }
};
exports.getCreateProfileController = getCreateProfileController;
const postUpdateProfileController = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { height, weight, gender, nickname, profileImage, profileAbout } = req.body;
        const profile = await (0, profileService_1.postUpdateProfileService)(height, weight, gender, nickname, profileImage, userId, profileAbout);
        res.status(200).json(profile);
    }
    catch (error) {
        console.error("프로필 수정 중 오류 발생:", error);
        next(error);
    }
};
exports.postUpdateProfileController = postUpdateProfileController;
const getNicknameCheckController = async (req, res, next) => {
    try {
        const { nickname } = req.params;
        const { userId } = req.query; // 현재 사용자 ID를 쿼리 파라미터로 받음
        const profile = await (0, profileService_1.getNicknameCheckService)(nickname);
        // 프로필이 존재하지만 현재 사용자의 것이라면 사용 가능
        let isAvailable = !profile;
        if (profile && userId && profile.user_id === userId) {
            isAvailable = true;
        }
        res.json({
            isAvailable,
            message: isAvailable ? "사용 가능한 닉네임입니다." : "이미 사용 중인 닉네임입니다."
        });
    }
    catch (error) {
        console.error("닉네임 중복확인 중 오류 발생:", error);
        res.status(500).json({ error: "닉네임 중복확인 중 오류 발생" });
    }
};
exports.getNicknameCheckController = getNicknameCheckController;
// 프로필 이미지 업로드 컨트롤러
const uploadProfileImageController = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "이미지 파일이 필요합니다." });
        }
        const fileName = `profileImage-${Date.now()}-${Math.random().toString(36).substring(2)}.jpg`;
        const result = await storageService_1.StorageService.uploadProfileImage(req.file.buffer, fileName);
        if (result.success && result.url) {
            res.json({
                success: true,
                imageUrl: result.url,
                fileName: fileName
            });
        }
        else {
            res.status(500).json({
                success: false,
                error: result.error || "이미지 업로드에 실패했습니다."
            });
        }
    }
    catch (error) {
        console.error("프로필 이미지 업로드 중 오류 발생:", error);
        res.status(500).json({ error: "이미지 업로드 중 오류가 발생했습니다." });
    }
};
exports.uploadProfileImageController = uploadProfileImageController;
