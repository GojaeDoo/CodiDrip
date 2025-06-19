// 간단한 암호화 키 (실제 프로덕션에서는 환경변수로 관리)
const ENCRYPTION_KEY = 'codiDrip2024';

// Base64 인코딩 + 간단한 XOR 암호화
export const encodeUserId = (userId: string): string => {
  try {
    let encrypted = '';
    for (let i = 0; i < userId.length; i++) {
      const charCode = userId.charCodeAt(i) ^ ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length);
      encrypted += String.fromCharCode(charCode);
    }
    
    return btoa(encrypted);
  } catch (error) {
    console.error('인코딩 오류:', error);
    return userId; 
  }
};

export const decodeUserId = (encodedUserId: string): string => {
  try {

    const decoded = atob(encodedUserId);
    

    let decrypted = '';
    for (let i = 0; i < decoded.length; i++) {
      const charCode = decoded.charCodeAt(i) ^ ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length);
      decrypted += String.fromCharCode(charCode);
    }
    
    return decrypted;
  } catch (error) {
    console.error('디코딩 오류:', error);
    return encodedUserId; // 실패 시 원본 반환
  }
}; 