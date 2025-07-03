// 이미지 URL을 Supabase URL로 변환하는 함수
export const getImageUrl = (imagePath: string | null | undefined): string | null => {
  if (!imagePath) return null;
  
  // 이미 Supabase URL이면 그대로 반환
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // 로컬 경로면 Supabase URL로 변환 (기존 이미지 호환성)
  if (imagePath.includes('profileImage')) {
    return `https://codidrip-backend.onrender.com/uploads/profiles/${imagePath}`;
  }
  
  if (imagePath.includes('dripImage') || imagePath.includes('.jpeg') || imagePath.includes('.jpg')) {
    return `https://codidrip-backend.onrender.com/uploads/drip/${imagePath}`;
  }
  
  return imagePath;
};

// 프로필 이미지 URL 처리
export const getProfileImageUrl = (imagePath: string | null | undefined): string | null => {
  if (!imagePath) return null;
  
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  return `https://codidrip-backend.onrender.com/uploads/profiles/${imagePath}`;
};

// Drip 이미지 URL 처리
export const getDripImageUrl = (imagePath: string | null | undefined): string | null => {
  if (!imagePath) return null;
  
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  return `https://codidrip-backend.onrender.com/uploads/drip/${imagePath}`;
}; 