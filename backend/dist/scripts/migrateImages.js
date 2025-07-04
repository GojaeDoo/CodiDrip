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
        // 프로필 이미지 마이그레이션
        const profilesDir = path_1.default.join(__dirname, '../../uploads/profiles');
        if (fs_1.default.existsSync(profilesDir)) {
            const profileFiles = fs_1.default.readdirSync(profilesDir);
            for (const file of profileFiles) {
                if (file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png')) {
                    const filePath = path_1.default.join(profilesDir, file);
                    const fileBuffer = fs_1.default.readFileSync(filePath);
                    const result = await storageService_1.StorageService.uploadProfileImage(fileBuffer, file);
                }
            }
        }
        // Drip 이미지 마이그레이션
        const dripsDir = path_1.default.join(__dirname, '../../uploads/drip');
        if (fs_1.default.existsSync(dripsDir)) {
            const dripFiles = fs_1.default.readdirSync(dripsDir);
            for (const file of dripFiles) {
                if (file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png')) {
                    const filePath = path_1.default.join(dripsDir, file);
                    const fileBuffer = fs_1.default.readFileSync(filePath);
                    const result = await storageService_1.StorageService.uploadDripImage(fileBuffer, file);
                    
                }
            }
        }
    }
    catch (error) {
        console.error('이미지 마이그레이션 중 오류 발생:', error);
    }
}
// 스크립트 실행
migrateImages();
