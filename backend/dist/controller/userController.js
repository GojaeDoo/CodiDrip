"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUserAdminStatusController = exports.getFollowingController = exports.getFollowersController = exports.postToggleFollowController = exports.getFollowStatusController = exports.postUserResetPasswordController = exports.postVerifyPasswordCodeController = exports.postLoginUserController = exports.postUserJoinController = exports.getFindPasswordController = exports.getFindIdController = exports.getEmailOverlappingCheckController = exports.getIdOverlappingCheckController = exports.getSelectUser = exports.getUsers = void 0;
const userService_1 = require("../service/userService");
const getUsers = async (req, res) => {
    try {
        const user = await (0, userService_1.getAllUsers)();
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ error: "getUsers 500error - userController" });
    }
};
exports.getUsers = getUsers;
const getSelectUser = async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) {
            res
                .status(400)
                .json({ error: "getSelectUser 400error - userController" });
            return;
        }
        const SelectUser = await (0, userService_1.selectUserService)({
            user_id: id,
        });
        res.json(SelectUser);
    }
    catch (error) {
        console.error("사용자 조회 실패:", error);
        res.status(500).json({ error: "getSelectUser 500error - userController" });
    }
};
exports.getSelectUser = getSelectUser;
const getIdOverlappingCheckController = async (req, res, next) => {
    try {
        const { user_id } = req.query;
        if (!user_id || typeof user_id !== "string") {
            res
                .status(400)
                .json({ error: "getIdOverlappingCheck 400error - userController" });
            return;
        }
        const idCheck = await (0, userService_1.getIdOverlappingCheckService)({
            user_id: user_id,
        });
        const OverlappingCheck = idCheck.length;
        res.json({ exists: OverlappingCheck });
    }
    catch (error) {
        res
            .status(500)
            .json({ error: "getIdOverlappingCheck 500error - userController" });
    }
};
exports.getIdOverlappingCheckController = getIdOverlappingCheckController;
const getEmailOverlappingCheckController = async (req, res, next) => {
    try {
        const { user_email } = req.query;
        if (!user_email || typeof user_email !== "string") {
            res
                .status(400)
                .json({ error: "getEmailOverlappingCheck 400error - userController" });
            return;
        }
        const emailCheck = await (0, userService_1.getEmailOverlappingCheckService)({
            user_email: user_email,
        });
        const OverlappingCheck = emailCheck.length;
        res.json({ exists: OverlappingCheck });
    }
    catch (error) {
        res
            .status(500)
            .json({ error: "getEmailOverlappingCheck 500error - userController" });
    }
};
exports.getEmailOverlappingCheckController = getEmailOverlappingCheckController;
const getFindIdController = async (req, res) => {
    try {
        const { email } = req.query;
        const findId = await (0, userService_1.getFindIdService)({
            user_email: email,
        });
        res.json({ findId });
    }
    catch (error) {
        console.error("아이디 찾기 실패:", error);
        res.status(500).json({ error: "getFindId 500error - userController" });
    }
};
exports.getFindIdController = getFindIdController;
const getFindPasswordController = async (req, res) => {
    try {
        const { id, email } = req.query;
        const findPassword = await (0, userService_1.getFindPasswordCheckService)({
            user_id: id,
            user_email: email,
        });
        res.json({ findPassword });
    }
    catch (error) {
        console.error("비밀번호 찾기 실패:", error);
        res
            .status(500)
            .json({ error: "getFindPassword 500error - userController" });
    }
};
exports.getFindPasswordController = getFindPasswordController;
const postUserJoinController = async (req, res, next) => {
    try {
        const userData = req.body;
        const result = await (0, userService_1.postUserJoinService)(userData);
        res.json(result);
    }
    catch (error) {
        if (error.code === "23505" && error.constraint === "users_user_email_key") {
            res.status(400).json({ error: "postUserJoin 400error - userController" });
        }
        else {
            console.error("회원가입 실패:", error);
            res.status(500).json({ error: "postUserJoin 500error - userController" });
        }
    }
};
exports.postUserJoinController = postUserJoinController;
const postLoginUserController = async (req, res, next) => {
    try {
        const { user_id, user_password } = req.body;
        if (!user_id || !user_password) {
            res
                .status(400)
                .json({ error: "아이디와 비밀번호를 모두 입력해주세요." });
            return;
        }
        const result = await (0, userService_1.postLoginUserService)(user_id, user_password);
        res.status(200).json({
            message: "로그인 성공",
            user: result.user,
            token: result.token,
        });
    }
    catch (error) {
        console.error("로그인 컨트롤러 에러:", error);
        res.status(401).json({ error: error.message });
    }
};
exports.postLoginUserController = postLoginUserController;
const postVerifyPasswordCodeController = async (req, res) => {
    try {
        const { email, code } = req.body;
        if (!email || !code) {
            res.status(400).json({
                error: "verifyPasswordCodeController 400error - userController",
            });
            return;
        }
        const result = await (0, userService_1.postVerifyPasswordCodeService)(email, code);
        res.json(result);
    }
    catch (error) {
        console.error("인증번호 검증 실패:", error);
        res.status(500).json({
            error: "verifyPasswordCodeController 500error - userController",
        });
    }
};
exports.postVerifyPasswordCodeController = postVerifyPasswordCodeController;
const postUserResetPasswordController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({
                error: "postUserResetPassword 400error - userController",
            });
            return;
        }
        const result = await (0, userService_1.postResetPasswordService)(email, password);
        res.json(result);
    }
    catch (error) {
        console.error("비밀번호 재설정 실패:", error);
        res.status(500).json({
            error: "postUserResetPassword 500error - userController",
        });
    }
};
exports.postUserResetPasswordController = postUserResetPasswordController;
// 팔로우 상태 확인 컨트롤러
const getFollowStatusController = async (req, res) => {
    try {
        const { followerId, followingId } = req.query;
        if (!followerId || !followingId) {
            res.status(400).json({
                error: "followerId와 followingId가 필요합니다."
            });
            return;
        }
        const result = await (0, userService_1.checkFollowStatusService)(followerId, followingId);
        res.json(result);
    }
    catch (error) {
        console.error("팔로우 상태 확인 실패:", error);
        res.status(500).json({
            error: "팔로우 상태 확인 중 오류가 발생했습니다."
        });
    }
};
exports.getFollowStatusController = getFollowStatusController;
// 팔로우 토글 컨트롤러
const postToggleFollowController = async (req, res) => {
    try {
        const { followerId, followingId } = req.body;
        if (!followerId || !followingId) {
            res.status(400).json({
                error: "followerId와 followingId가 필요합니다."
            });
            return;
        }
        const result = await (0, userService_1.toggleFollowService)(followerId, followingId);
        res.json(result);
    }
    catch (error) {
        console.error("팔로우 토글 실패:", error);
        res.status(500).json({
            error: error.message || "팔로우 처리 중 오류가 발생했습니다."
        });
    }
};
exports.postToggleFollowController = postToggleFollowController;
// 팔로워 목록 가져오기 컨트롤러
const getFollowersController = async (req, res) => {
    try {
        const { userId } = req.query;
        if (!userId) {
            res.status(400).json({
                error: "userId가 필요합니다."
            });
            return;
        }
        const followers = await (0, userService_1.getFollowersService)(userId);
        res.json(followers);
    }
    catch (error) {
        console.error("팔로워 목록 조회 실패:", error);
        res.status(500).json({
            error: "팔로워 목록 조회 중 오류가 발생했습니다."
        });
    }
};
exports.getFollowersController = getFollowersController;
// 팔로잉 목록 가져오기 컨트롤러
const getFollowingController = async (req, res) => {
    try {
        const { userId } = req.query;
        if (!userId || typeof userId !== "string") {
            res.status(400).json({ error: "getFollowingController 400error - userController" });
            return;
        }
        const following = await (0, userService_1.getFollowingService)(userId);
        res.json(following);
    }
    catch (error) {
        console.error("팔로잉 목록 조회 실패:", error);
        res.status(500).json({ error: "getFollowingController 500error - userController" });
    }
};
exports.getFollowingController = getFollowingController;
// 사용자 관리자 상태 확인 컨트롤러
const checkUserAdminStatusController = async (req, res) => {
    try {
        const { userId } = req.query;
        if (!userId || typeof userId !== "string") {
            res.status(400).json({ error: "checkUserAdminStatusController 400error - userController" });
            return;
        }
        const user = await (0, userService_1.checkUserAdminStatusService)(userId);
        res.json(user);
    }
    catch (error) {
        console.error("사용자 관리자 상태 확인 실패:", error);
        res.status(500).json({ error: "checkUserAdminStatusController 500error - userController" });
    }
};
exports.checkUserAdminStatusController = checkUserAdminStatusController;
