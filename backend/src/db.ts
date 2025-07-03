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
console.log('  - DB_PORT:', process.env.DB_PORT || '6543 (기본값)');

// DATABASE_URL이 있으면 사용, 없으면 개별 환경변수 사용
const connectionConfig = process.env.DATABASE_URL ? {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  }
} : {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "6543"),
  ssl: {
    rejectUnauthorized: false,
  }
};

export const pool = new Pool({
  ...connectionConfig,
  connectionTimeoutMillis: 10000, // 10초
  idleTimeoutMillis: 30000, // 30초
  max: 20, // 최대 연결 수
});

// 데이터베이스 연결 테스트 함수
export const testDatabaseConnection = async () => {
  try {
    console.log('🔍 데이터베이스 연결 시도 중...');
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
    return false;
  }
};
