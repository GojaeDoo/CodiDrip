import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Supabase 환경변수가 설정되지 않았습니다.');
  console.error('SUPABASE_URL:', supabaseUrl ? '✅ 설정됨' : '❌ 누락');
  console.error('SUPABASE_ANON_KEY:', supabaseAnonKey ? '✅ 설정됨' : '❌ 누락');
  console.log('⚠️  Supabase Storage 기능이 비활성화됩니다. 로컬 저장소만 사용됩니다.');
}

// 서비스 롤 키 확인
if (!supabaseServiceKey) {
  console.log('⚠️  SUPABASE_SERVICE_ROLE_KEY가 설정되지 않았습니다. 버킷 관리 기능이 제한될 수 있습니다.');
}

// 일반 사용을 위한 클라이언트 (anon key 사용)
export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

// 관리자 권한을 위한 클라이언트 (service role key 사용)
export const supabaseAdmin = supabaseUrl && supabaseServiceKey ? createClient(supabaseUrl, supabaseServiceKey) : null;

// Supabase 연결 테스트
export const testSupabaseConnection = async () => {
  if (!supabase) {
    console.log('⚠️  Supabase 클라이언트가 초기화되지 않았습니다.');
    return false;
  }
  
  try {
    // 먼저 일반 클라이언트로 버킷 목록 조회 시도
    const { data, error } = await supabase.storage.listBuckets();
    
    if (error) {
      console.error('❌ Supabase Storage 연결 실패:', error.message);
      return false;
    }
    
    console.log('✅ Supabase Storage 연결 성공');
    console.log('📦 사용 가능한 버킷:', data.map(bucket => bucket.name));
    
    // 필요한 버킷 확인
    const requiredBuckets = ['profiles', 'drips'];
    const existingBuckets = data.map(bucket => bucket.name);
    const missingBuckets = requiredBuckets.filter(name => !existingBuckets.includes(name));
    
    if (missingBuckets.length > 0) {
      console.log('🔧 누락된 버킷 확인 중...');
      
      // 관리자 클라이언트로 다시 시도
      if (supabaseAdmin) {
        console.log('🔑 관리자 권한으로 버킷 목록 재확인 중...');
        const { data: adminData, error: adminError } = await supabaseAdmin.storage.listBuckets();
        
        if (!adminError && adminData) {
          const adminBuckets = adminData.map(bucket => bucket.name);
          console.log('📦 관리자 권한으로 확인된 버킷:', adminBuckets);
          
          // 관리자 권한으로 누락된 버킷 생성 시도
          const stillMissing = requiredBuckets.filter(name => !adminBuckets.includes(name));
          
          if (stillMissing.length > 0) {
            console.log('🔧 관리자 권한으로 누락된 버킷 생성 중...');
            
            for (const bucketName of stillMissing) {
              console.log(`📦 ${bucketName} 버킷 생성 중...`);
              
              const { error: createError } = await supabaseAdmin.storage.createBucket(bucketName, {
                public: true,
                fileSizeLimit: 52428800, // 50MB
                allowedMimeTypes: ['image/*']
              });
              
              if (createError) {
                console.error(`❌ ${bucketName} 버킷 생성 실패:`, createError.message);
              } else {
                console.log(`✅ ${bucketName} 버킷 생성 성공`);
              }
            }
          } else {
            console.log('✅ 관리자 권한으로 확인한 결과 모든 버킷이 존재합니다.');
          }
        } else {
          console.log('⚠️  관리자 권한으로 버킷 확인 실패:', adminError?.message);
        }
      } else {
        console.log('⚠️  관리자 클라이언트가 초기화되지 않았습니다. SUPABASE_SERVICE_ROLE_KEY를 확인하세요.');
      }
    } else {
      console.log('✅ 모든 필요한 버킷이 존재합니다.');
    }
    
    return true;
  } catch (error) {
    console.error('❌ Supabase 연결 테스트 실패:', error);
    return false;
  }
}; 