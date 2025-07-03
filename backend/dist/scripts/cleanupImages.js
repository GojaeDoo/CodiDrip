"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
async function cleanupImages() {
    try {
        console.log('기존 로컬 이미지 정리를 시작합니다...');
        // 프로필 이미지 정리
        const profilesDir = path_1.default.join(__dirname, '../../uploads/profiles');
        if (fs_1.default.existsSync(profilesDir)) {
            const profileFiles = fs_1.default.readdirSync(profilesDir);
            console.log(`프로필 이미지 ${profileFiles.length}개 발견`);
            for (const file of profileFiles) {
                if (file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png')) {
                    const filePath = path_1.default.join(profilesDir, file);
                    fs_1.default.unlinkSync(filePath);
                    console.log(`✅ 프로필 이미지 삭제: ${file}`);
                }
            }
        }
        // Drip 이미지 정리
        const dripsDir = path_1.default.join(__dirname, '../../uploads/drip');
        if (fs_1.default.existsSync(dripsDir)) {
            const dripFiles = fs_1.default.readdirSync(dripsDir);
            console.log(`Drip 이미지 ${dripFiles.length}개 발견`);
            for (const file of dripFiles) {
                if (file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png')) {
                    const filePath = path_1.default.join(dripsDir, file);
                    fs_1.default.unlinkSync(filePath);
                    console.log(`✅ Drip 이미지 삭제: ${file}`);
                }
            }
        }
        console.log('기존 로컬 이미지 정리가 완료되었습니다.');
        console.log('⚠️  주의: 이 작업은 되돌릴 수 없습니다. 마이그레이션이 완료된 후에만 실행하세요.');
    }
    catch (error) {
        console.error('이미지 정리 중 오류 발생:', error);
    }
}
// 스크립트 실행
cleanupImages();
