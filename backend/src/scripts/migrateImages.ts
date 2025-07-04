import { StorageService } from '../service/storageService';
import fs from 'fs';
import path from 'path';

async function migrateImages() {
  try {

    // 프로필 이미지 마이그레이션
    const profilesDir = path.join(__dirname, '../../uploads/profiles');
    if (fs.existsSync(profilesDir)) {
      const profileFiles = fs.readdirSync(profilesDir);

      for (const file of profileFiles) {
        if (file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png')) {
          const filePath = path.join(profilesDir, file);
          const fileBuffer = fs.readFileSync(filePath);
          const result = await StorageService.uploadProfileImage(fileBuffer, file);
          if (result.success) {
            console.log(`success`);
          } else {
            console.log(`fail`);
          }
        }
      }
    }

    // Drip 이미지 마이그레이션
    const dripsDir = path.join(__dirname, '../../uploads/drip');
    if (fs.existsSync(dripsDir)) {
      const dripFiles = fs.readdirSync(dripsDir);

      for (const file of dripFiles) {
        if (file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png')) {
          const filePath = path.join(dripsDir, file);
          const fileBuffer = fs.readFileSync(filePath);
          const result = await StorageService.uploadDripImage(fileBuffer, file);
          if (result.success) {
            console.log(`success`);
          } else {
            console.log(`fail`);
          }
        }
      }
    }

    console.log('이미지 마이그레이션이 완료.');
  } catch (error) {
    console.error('이미지 마이그레이션 중 오류 발생:', error);
  }
}

// 스크립트 실행
migrateImages(); 