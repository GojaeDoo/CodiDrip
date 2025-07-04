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
  if (!imagePath) return "/images/profile/default-profile.png";
  
  if (imagePath.startsWith('http')) {
    // Supabase URL이면 그대로 사용
    if (imagePath.includes('supabase.co')) {
      return imagePath;
    }
    // 잘못된 백엔드 URL을 올바른 URL로 변환
    if (imagePath.includes('codidrip-backend.onrender.com')) {
      return imagePath.replace('codidrip-backend.onrender.com', 'codidrip-rp6z.onrender.com');
    }
    return imagePath;
  }
  
  // 파일명만 추출 (앞에 /가 있든 없든 무조건 제거)
  const fileName = imagePath.replace(/^\\|\//, '');
  return `${API_BASE_URL}/uploads/profiles/${fileName}`;
};

// Drip 이미지 URL 처리
export const getDripImageUrl = (imagePath: string | null | undefined): string | null => {
  if (!imagePath) return "/images/profile/default-profile.png";
  
  if (imagePath.startsWith('http')) {
    // Supabase URL이면 그대로 사용
    if (imagePath.includes('supabase.co')) {
      return imagePath;
    }
    // 잘못된 백엔드 URL을 올바른 URL로 변환
    if (imagePath.includes('codidrip-backend.onrender.com')) {
      return imagePath.replace('codidrip-backend.onrender.com', 'codidrip-rp6z.onrender.com');
    }
    return imagePath;
  }
  
  // 파일명만 추출 (앞에 /가 있든 없든 무조건 제거)
  const fileName = imagePath.replace(/^\\|\//, '');
  
  // 배포 환경에서는 Supabase Storage URL 사용
  // 로컬 환경에서는 백엔드 uploads 경로 사용
  const isProduction = typeof window !== 'undefined' && 
    !window.location.hostname.includes('localhost') && 
    !window.location.hostname.includes('127.0.0.1');
  
  if (isProduction) {
    // Supabase Storage URL
    const supabaseUrl = `https://caqmlnxqlyaqajzbhdmo.supabase.co/storage/v1/object/public/drips/${fileName}`;
    console.log('배포 환경 URL:', supabaseUrl);
    return supabaseUrl;
  } else {
    // 로컬 백엔드 URL
    const localUrl = `${API_BASE_URL}/uploads/drip/${fileName}`;
    console.log('로컬 환경 URL:', localUrl);
    return localUrl;
  }
}; 