import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

// 환경변수 로깅 (비밀번호는 마스킹)
console.log('🔧 데이터베이스 연결 설정:');
console.log('  - DATABASE_URL:', process.env.DATABASE_URL ? '✅ 설정됨' : '❌ 누락');
console.log('  - DB_USER:', process.env.DB_USER ? '✅ 설정됨' : '❌ 누락');
console.log('  - DB_HOST:', process.env.DB_HOST ? '✅ 설정됨' : '❌ 누락');
console.log('  - DB_DATABASE:', process.env.DB_DATABASE ? '✅ 설정됨' : '❌ 누락');
console.log('  - DB_PASSWORD:', process.env.DB_PASSWORD ? '✅ 설정됨' : '❌ 누락');
console.log('  - DB_PORT:', process.env.DB_PORT || '5432 (기본값)');
console.log('  - NODE_ENV:', process.env.NODE_ENV || 'development');

// DATABASE_URL에서 직접 연결 URL 생성
let connectionString = process.env.DATABASE_URL;
if (connectionString && connectionString.includes('pooler.supabase.com')) {
  // pooler URL을 그대로 사용하되 SSL 설정만 수정
  connectionString = connectionString.replace('?sslmode=require', '');
  console.log('🔄 Pooler URL 사용 (SSL 설정 수정):', connectionString.replace(/:[^:@]*@/, ':***@'));
}

// DATABASE_URL이 있으면 사용, 없으면 개별 환경변수 사용
const connectionConfig = connectionString ? {
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false
  }
} : {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "6543"), // pooler 포트로 되돌림
  ssl: {
    rejectUnauthorized: false
  }
};

console.log('🔧 연결 설정:', {
  ...connectionConfig,
  password: connectionConfig.password ? '[HIDDEN]' : undefined,
  connectionString: connectionConfig.connectionString ? 
    connectionConfig.connectionString.replace(/:[^:@]*@/, ':***@') : undefined
});

export const pool = new Pool({
  ...connectionConfig,
  connectionTimeoutMillis: 15000, // 15초로 증가
  idleTimeoutMillis: 30000, // 30초
  max: 20, // 최대 연결 수
});

// 데이터베이스 연결 테스트 함수
export const testDatabaseConnection = async () => {
  try {
    console.log('🔍 데이터베이스 연결 시도 중...');
    console.log('  - 호스트:', process.env.DB_HOST || 'DATABASE_URL 사용');
    console.log('  - 포트:', process.env.DB_PORT || '5432');
    
    const client = await pool.connect();
    console.log('✅ 데이터베이스 클라이언트 연결 성공');
    
    const result = await client.query('SELECT NOW() as current_time, version() as db_version');
    client.release();
    
    console.log('✅ 데이터베이스 쿼리 성공:', result.rows[0]);
    return true;
  } catch (error) {
    console.error('❌ 데이터베이스 연결 실패:', error);
    console.error('  - 에러 코드:', error.code);
    console.error('  - 에러 메시지:', error.message);
    console.error('  - 에러 스택:', error.stack);
    
    // 구체적인 에러 타입별 안내
    if (error.code === 'ECONNREFUSED') {
      console.error('💡 해결방법: 호스트나 포트가 올바른지 확인하세요.');
    } else if (error.code === 'ETIMEDOUT') {
      console.error('💡 해결방법: 네트워크 연결을 확인하거나 Supabase IP 허용 설정을 확인하세요.');
    } else if (error.code === '28P01') {
      console.error('💡 해결방법: 사용자명과 비밀번호가 올바른지 확인하세요.');
    } else if (error.code === '3D000') {
      console.error('💡 해결방법: 데이터베이스명이 올바른지 확인하세요.');
    } else if (error.code === 'SELF_SIGNED_CERT_IN_CHAIN') {
      console.error('💡 해결방법: SSL 인증서 문제입니다. 직접 연결 URL을 사용하세요.');
    }
    
    return false;
  }
};
