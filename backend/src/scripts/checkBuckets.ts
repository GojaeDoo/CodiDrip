import { supabase } from '../supabase';

async function checkBuckets() {
  try {
    if (!supabase) {
      console.error(' Supabase 클라이언트가 초기화되지 않았습니다.');
      return;
    }

    // 모든 버킷 목록 조회
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
    
    if (bucketsError) {
      console.error(' 버킷 목록 조회 실패:', bucketsError);
      return;
    }

    // 필요한 버킷들 확인
    const requiredBuckets = ['profiles', 'drips'];
    const existingBuckets = buckets.map(b => b.name);
    
    for (const bucketName of requiredBuckets) {
      if (existingBuckets.includes(bucketName)) {
        
        // 버킷의 파일 목록 확인
        const { data: files, error: filesError } = await supabase.storage
          .from(bucketName)
          .list();
        
        if (filesError) {
          console.log(`  ${bucketName} 파일 목록 조회 실패:`, filesError.message);
        } else {
          console.log(` ${bucketName} 파일 개수: ${files.length}개`);
        }
      } else {
        console.log(` ${bucketName}: 존재하지 않음`);
      }
    }
    
    // 누락된 버킷 생성
    const missingBuckets = requiredBuckets.filter(name => !existingBuckets.includes(name));
    
    if (missingBuckets.length > 0) {
      
      for (const bucketName of missingBuckets) {   
        const { data, error } = await supabase.storage.createBucket(bucketName, {
          public: true,
          fileSizeLimit: 52428800, // 50MB
          allowedMimeTypes: ['image/*']
        });
        
        if (error) {
          console.error(` ${bucketName} 버킷 생성 실패:`, error.message);
        } else {
          console.log(` ${bucketName} 버킷 생성 성공`);
        }
      }
    } else {
      console.log('\n 모든 필요한 버킷이 존재');
    }
    
  } catch (error) {
    console.error(' 버킷 확인 중 오류 발생:', error);
  }
}

// 스크립트 실행
checkBuckets().then(() => {
  process.exit(0);
}).catch((error) => {
  console.error(' 스크립트 실행 실패:', error);
  process.exit(1);
}); 