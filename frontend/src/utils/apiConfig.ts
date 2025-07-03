// API 기본 URL 설정
export const API_BASE_URL = 'https://codidrip-rp6z.onrender.com';

// API 엔드포인트들
export const API_ENDPOINTS = {
  // 사용자 관련
  LOGIN: `${API_BASE_URL}/api/users/login`,
  JOIN: `${API_BASE_URL}/api/users`,
  FIND_ID: `${API_BASE_URL}/api/users/find-id`,
  FIND_PASSWORD: `${API_BASE_URL}/api/users/find-password`,
  RESET_PASSWORD: `${API_BASE_URL}/api/users/reset-password`,
  ADMIN_STATUS: `${API_BASE_URL}/api/users/admin-status`,
  
  // 프로필 관련
  PROFILES: `${API_BASE_URL}/api/profiles`,
  PROFILE_CREATE: `${API_BASE_URL}/api/profiles/createProfile`,
  PROFILE_UPLOAD: `${API_BASE_URL}/api/profiles/upload`,
  
  // Drip 관련
  DRIP: `${API_BASE_URL}/api/drip`,
  DRIP_UPLOAD: `${API_BASE_URL}/api/drip/upload`,
  
  // 검색 관련
  SEARCH: `${API_BASE_URL}/api/search/search`,
  
  // 자유게시판 관련
  FREEBOARD: `${API_BASE_URL}/api/freeBoard`,
  
  // 신고 관련
  REPORTS: `${API_BASE_URL}/api/reports`,
  REPORTS_ADMIN: `${API_BASE_URL}/api/reports/admin`,
  REPORTS_ADMIN_DRIP: `${API_BASE_URL}/api/reports/admin/drip`,
} as const; 