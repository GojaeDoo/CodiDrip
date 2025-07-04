import fs from 'fs';
import path from 'path';

async function cleanupImages() {
  try {
    // 프로필 이미지 정리
    const profilesDir = path.join(__dirname, '../../uploads/profiles');
    if (fs.existsSync(profilesDir)) {
      const profileFiles = fs.readdirSync(profilesDir);

      for (const file of profileFiles) {
        if (file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png')) {
          const filePath = path.join(profilesDir, file);
          fs.unlinkSync(filePath);
        }
      }
    }

    // Drip 이미지 정리
    const dripsDir = path.join(__dirname, '../../uploads/drip');
    if (fs.existsSync(dripsDir)) {
      const dripFiles = fs.readdirSync(dripsDir);

      for (const file of dripFiles) {
        if (file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png')) {
          const filePath = path.join(dripsDir, file);
          fs.unlinkSync(filePath);
        }
      }
    }
  } catch (error) {
    console.error('이미지 정리 중 오류 발생:', error);
  }
}

// 스크립트 실행
cleanupImages(); 