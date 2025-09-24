import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const isDevelopment = process.env.NODE_ENV === 'development';
const isLocal = !supabaseUrl || !supabaseAnonKey;

export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

export const supabaseAdmin = supabaseUrl && supabaseServiceKey ? createClient(supabaseUrl, supabaseServiceKey) : null;

export const testSupabaseConnection = async () => {
  if (!supabase) {
    return false;
  }
  
  try {
    const { data, error } = await supabase.storage.listBuckets();
    
    if (error) {
      console.error('Supabase Storage 연결 실패:', error.message);
      return false;
    }
    
    const requiredBuckets = ['profiles', 'drips'];
    const existingBuckets = data.map(bucket => bucket.name);
    const missingBuckets = requiredBuckets.filter(name => !existingBuckets.includes(name));
    
    if (missingBuckets.length > 0) {
      
      if (supabaseAdmin) {
        const { data: adminData, error: adminError } = await supabaseAdmin.storage.listBuckets();
        
        if (!adminError && adminData) {
          const adminBuckets = adminData.map(bucket => bucket.name);
          
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