import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Supabase 환경변수가 설정되지 않았습니다.');
  console.error('SUPABASE_URL:', supabaseUrl ? '✅ 설정됨' : '❌ 누락');
  console.error('SUPABASE_ANON_KEY:', supabaseKey ? '✅ 설정됨' : '❌ 누락');
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Supabase 연결 테스트
export const testSupabaseConnection = async () => {
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