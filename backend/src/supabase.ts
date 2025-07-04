import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// 환경 확인
const isDevelopment = process.env.NODE_ENV === 'development';
const isLocal = !supabaseUrl || !supabaseAnonKey;

// 일반 사용을 위한 클라이언트 (anon key 사용)
export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

// 관리자 권한을 위한 클라이언트 (service role key 사용)
export const supabaseAdmin = supabaseUrl && supabaseServiceKey ? createClient(supabaseUrl, supabaseServiceKey) : null;

// Supabase 연결 테스트
export const testSupabaseConnection = async () => {
  if (!supabase) {
    return false;
  }
  
  try {
    // 먼저 일반 클라이언트로 버킷 목록 조회 시도
    const { data, error } = await supabase.storage.listBuckets();
    
    if (error) {
      console.error('Supabase Storage 연결 실패:', error.message);
      return false;
    }
    
    // 필요한 버킷 확인
    const requiredBuckets = ['profiles', 'drips'];
    const existingBuckets = data.map(bucket => bucket.name);
    const missingBuckets = requiredBuckets.filter(name => !existingBuckets.includes(name));
    
    if (missingBuckets.length > 0) {
      
      // 관리자 클라이언트로 다시 시도
      if (supabaseAdmin) {
        const { data: adminData, error: adminError } = await supabaseAdmin.storage.listBuckets();
        
        if (!adminError && adminData) {
          const adminBuckets = adminData.map(bucket => bucket.name);
          
          // 관리자 권한으로 누락된 버킷 생성 시도
          const stillMissing = requiredBuckets.filter(name => !adminBuckets.includes(name));
          
          if (stillMissing.length > 0) {
            for (const bucketName of stillMissing) {
              const { error: createError } = await supabaseAdmin.storage.createBucket(bucketName, {
                public: true,
                fileSizeLimit: 52428800,
                allowedMimeTypes: ['image/*']
              });
              
              if (createError) {
                console.error(` ${bucketName} 버킷 생성 실패:`, createError.message);
              } 
            }
          } 
        }
      } 
    } 
    return true;
  } catch (error) {
    console.error(' Supabase 연결 테스트 실패:', error);
    return false;
  }
}; 