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
    return true;
  } catch (error) {
    console.error('❌ Supabase 연결 테스트 실패:', error);
    return false;
  }
}; 