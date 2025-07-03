"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const dripController_1 = require("../controller/dripController");
const router = express_1.default.Router();
// Supabase Storage를 사용한 Drip 이미지 업로드
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(), // 메모리에 저장
    limits: {
        fileSize: 50 * 1024 * 1024, // 50MB 제한
    },
});
// Drip 게시글
// Drip 이미지 업로드
router.post("/upload", upload.single("dripImage"), dripController_1.uploadDripImageController);
// Drip 생성
router.post("/", dripController_1.postCreateDripController);
// 사용자별 Drip 조회
router.get("/", dripController_1.getUserDripController);
// Drip 게시글 좋아요 상태 조회
router.get("/like-status", dripController_1.getDripPostLikeStatusController);
// Drip 조회
router.get("/:postNo", dripController_1.getPostNoDripController);
// Drip 수정
router.put("/:postNo", dripController_1.postUpdateDripController);
// Drip 삭제
router.delete("/:postNo", dripController_1.deleteDripController);
// Drip 게시글 좋아요
router.post("/:postNo/like", dripController_1.likeDripPostController);
// Drip 게시글 좋아요 취소
router.delete("/:postNo/like", dripController_1.unlikeDripPostController);
// Drip 게시글 저장
router.post("/:postNo/save", dripController_1.saveDripPostController);
// Drip 게시글 저장 상태 확인
router.get("/:postNo/save-status", dripController_1.getDripPostSaveStatusController);
// Drip 댓글
// Drip 댓글 조회
router.get("/:postNo/comments", dripController_1.getDripPostCommentController);
// Drip 댓글 작성
router.post("/:postNo/comments", dripController_1.postDripPostCommentController);
// Drip 댓글 수정
router.put("/comments/:commentId", dripController_1.updateDripPostCommentController);
// Drip 댓글 삭제
router.delete("/comments/:commentId", dripController_1.deleteDripPostCommentController);
// Drip 댓글 좋아요
router.post("/comments/:commentId/like", dripController_1.likeDripPostCommentController);
// Drip 댓글 좋아요 취소
router.delete("/comments/:commentId/like", dripController_1.unlikeDripPostCommentController);
// Drip 대댓글 작성
router.post("/comments/:commentId/replies", dripController_1.postDripPostReplyController);
exports.default = router;
