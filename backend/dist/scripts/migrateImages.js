"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const storageService_1 = require("../service/storageService");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
async function migrateImages() {
    try {
        console.log('이미지 마이그레이션을 시작...');
        // 프로필 이미지 마이그레이션
        const profilesDir = path_1.default.join(__dirname, '../../uploads/profiles');
        if (fs_1.default.existsSync(profilesDir)) {
            const profileFiles = fs_1.default.readdirSync(profilesDir);
            console.log(`프로필 이미지 ${profileFiles.length}개 발견`);
            for (const file of profileFiles) {
                if (file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png')) {
                    const filePath = path_1.default.join(profilesDir, file);
                    const fileBuffer = fs_1.default.readFileSync(filePath);
                    console.log(`프로필 이미지 업로드 중: ${file}`);
                    const result = await storageService_1.StorageService.uploadProfileImage(fileBuffer, file);
                    if (result.success) {
                        console.log(` 프로필 이미지 업로드 성공: ${file} -> ${result.url}`);
                    }
                    else {
                        console.log(` 프로필 이미지 업로드 실패: ${file} - ${result.error}`);
                    }
                }
            }
        }
        // Drip 이미지 마이그레이션
        const dripsDir = path_1.default.join(__dirname, '../../uploads/drip');
        if (fs_1.default.existsSync(dripsDir)) {
            const dripFiles = fs_1.default.readdirSync(dripsDir);
            console.log(`Drip 이미지 ${dripFiles.length}개 발견`);
            for (const file of dripFiles) {
                if (file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png')) {
                    const filePath = path_1.default.join(dripsDir, file);
                    const fileBuffer = fs_1.default.readFileSync(filePath);
                    console.log(`Drip 이미지 업로드 중: ${file}`);
                    const result = await storageService_1.StorageService.uploadDripImage(fileBuffer, file);
                    if (result.success) {
                        console.log(` Drip 이미지 업로드 성공: ${file} -> ${result.url}`);
                    }
                    else {
                        console.log(` Drip 이미지 업로드 실패: ${file} - ${result.error}`);
                    }
                }
            }
        }
        console.log('이미지 마이그레이션이 완료.');
    }
    catch (error) {
        console.error('이미지 마이그레이션 중 오류 발생:', error);
    }
}
// 스크립트 실행
migrateImages();
