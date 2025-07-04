import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Supabase 환경변수가 설정되지 않았습니다.');
  console.error('SUPABASE_URL:', supabaseUrl ? '✅ 설정됨' : '❌ 누락');
  console.error('SUPABASE_ANON_KEY:', supabaseKey ? '✅ 설정됨' : '❌ 누락');
  console.log('⚠️  Supabase Storage 기능이 비활성화됩니다. 로컬 저장소만 사용됩니다.');
}

export const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

// Supabase 연결 테스트
export const testSupabaseConnection = async () => {
  if (!supabase) {
    console.log('⚠️  Supabase 클라이언트가 초기화되지 않았습니다.');
    return false;
  }
  
  try {
    const { data, error } = await supabase.storage.listBuckets();
    if (error) {
      console.error('❌ Supabase Storage 연결 실패:', error.message);
      return false;
    }
    console.log('✅ Supabase Storage 연결 성공');
    console.log('📦 사용 가능한 버킷:', data.map(bucket => bucket.name));
    
    // 필요한 버킷 확인 및 생성
    const requiredBuckets = ['profiles', 'drips'];
    const existingBuckets = data.map(bucket => bucket.name);
    const missingBuckets = requiredBuckets.filter(name => !existingBuckets.includes(name));
    
    if (missingBuckets.length > 0) {
      console.log('🔧 누락된 버킷 생성 중...');
      
      for (const bucketName of missingBuckets) {
        console.log(`📦 ${bucketName} 버킷 생성 중...`);
        
        const { error: createError } = await supabase.storage.createBucket(bucketName, {
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
      console.log('✅ 모든 필요한 버킷이 존재합니다.');
    }
    
    return true;
  } catch (error) {
    console.error('❌ Supabase 연결 테스트 실패:', error);
    return false;
  }
}; 