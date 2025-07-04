import { StorageService } from '../service/storageService';
import fs from 'fs';
import path from 'path';

async function migrateImages() {
  try {
    console.log('이미지 마이그레이션을 시작합니다...');

    // 프로필 이미지 마이그레이션
    const profilesDir = path.join(__dirname, '../../uploads/profiles');
    if (fs.existsSync(profilesDir)) {
      const profileFiles = fs.readdirSync(profilesDir);
      console.log(`프로필 이미지 ${profileFiles.length}개 발견`);

      for (const file of profileFiles) {
        if (file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png')) {
          const filePath = path.join(profilesDir, file);
          const fileBuffer = fs.readFileSync(filePath);
          
          console.log(`프로필 이미지 업로드 중: ${file}`);
          const result = await StorageService.uploadProfileImage(fileBuffer, file);
          
          if (result.success) {
            console.log(` 프로필 이미지 업로드 성공: ${file} -> ${result.url}`);
          } else {
            console.log(` 프로필 이미지 업로드 실패: ${file} - ${result.error}`);
          }
        }
      }
    }

    // Drip 이미지 마이그레이션
    const dripsDir = path.join(__dirname, '../../uploads/drip');
    if (fs.existsSync(dripsDir)) {
      const dripFiles = fs.readdirSync(dripsDir);
      console.log(`Drip 이미지 ${dripFiles.length}개 발견`);

      for (const file of dripFiles) {
        if (file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png')) {
          const filePath = path.join(dripsDir, file);
          const fileBuffer = fs.readFileSync(filePath);
          
          console.log(`Drip 이미지 업로드 중: ${file}`);
          const result = await StorageService.uploadDripImage(fileBuffer, file);
          
          if (result.success) {
            console.log(` Drip 이미지 업로드 성공: ${file} -> ${result.url}`);
          } else {
            console.log(` Drip 이미지 업로드 실패: ${file} - ${result.error}`);
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