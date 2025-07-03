import { API_BASE_URL } from './apiConfig';

// 이미지 URL을 올바른 URL로 변환하는 함수
export const getImageUrl = (imagePath: string | null | undefined): string | null => {
  if (!imagePath) return null;
  
  // 이미 완전한 URL이면 그대로 반환
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // 파일명만 추출 (앞에 /가 있든 없든 무조건 제거)
  const fileName = imagePath.replace(/^\\|\//, '');
  
  // 로컬 경로면 API URL로 변환 (기존 이미지 호환성)
  if (fileName.includes('profileImage')) {
    return `${API_BASE_URL}/uploads/profiles/${fileName}`;
  }
  
  if (fileName.includes('dripImage') || fileName.includes('.jpeg') || fileName.includes('.jpg') || fileName.includes('.png')) {
    return `${API_BASE_URL}/uploads/drip/${fileName}`;
  }
  
  return imagePath;
};

// 프로필 이미지 URL 처리
export const getProfileImageUrl = (imagePath: string | null | undefined): string | null => {
  if (!imagePath) return null;
  
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // 파일명만 추출 (앞에 /가 있든 없든 무조건 제거)
  const fileName = imagePath.replace(/^\\|\//, '');
  return `${API_BASE_URL}/uploads/profiles/${fileName}`;
};

// Drip 이미지 URL 처리
export const getDripImageUrl = (imagePath: string | null | undefined): string | null => {
  if (!imagePath) return null;
  
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // 파일명만 추출 (앞에 /가 있든 없든 무조건 제거)
  const fileName = imagePath.replace(/^\\|\//, '');
  return `${API_BASE_URL}/uploads/drip/${fileName}`;
}; 