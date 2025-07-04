import { supabase } from '../supabase';

export interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
  fallback?: boolean;
}

export class StorageService {
  private static readonly PROFILES_BUCKET = 'profiles';
  private static readonly DRIPS_BUCKET = 'drips';

  // 로컬 저장소에 업로드하는 헬퍼 메서드
  private static uploadToLocalStorage(file: Buffer, fileName: string, folder: string): UploadResult {
    try {
      const fs = require('fs');
      const path = require('path');
      const uploadDir = path.join(process.cwd(), 'uploads', folder);
      
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      
      const filePath = path.join(uploadDir, fileName);
      fs.writeFileSync(filePath, file);
      
      // Render 환경에서는 올바른 URL 사용
      const baseUrl = process.env.BACKEND_URL || 'https://codidrip-rp6z.onrender.com';
      return { 
        success: true, 
        url: `${baseUrl}/uploads/${folder}/${fileName}`,
        fallback: true 
      };
    } catch (error) {
      console.error('Local storage upload error:', error);
      return { success: false, error: 'Local upload failed' };
    }
  }

  // 프로필 이미지 업로드
  static async uploadProfileImage(file: Buffer, fileName: string): Promise<UploadResult> {
    // Supabase가 설정되지 않은 경우 로컬 저장소로 폴백
    if (!supabase) {
      console.log('  Supabase가 설정되지 않았습니다. 로컬 저장소로 폴백합니다.');
      return this.uploadToLocalStorage(file, fileName, 'profiles');
    }

    try {
      const { data, error } = await supabase.storage
        .from(this.PROFILES_BUCKET)
        .upload(fileName, file, {
          contentType: 'image/jpeg',
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('Profile image upload error:', error);
        console.log(' Supabase 업로드 실패, 로컬 저장소로 폴백...');
        return this.uploadToLocalStorage(file, fileName, 'profiles');
      }

      const { data: urlData } = supabase.storage
        .from(this.PROFILES_BUCKET)
        .getPublicUrl(fileName);

      return { success: true, url: urlData.publicUrl };
    } catch (error) {
      console.error('Profile image upload error:', error);
      console.log(' Supabase 업로드 실패, 로컬 저장소로 폴백...');
      return this.uploadToLocalStorage(file, fileName, 'profiles');
    }
  }

  // Drip 이미지 업로드
  static async uploadDripImage(file: Buffer, fileName: string): Promise<UploadResult> {
    // Supabase가 설정되지 않은 경우 로컬 저장소로 폴백
    if (!supabase) {
      console.log('  Supabase가 설정되지 않았습니다. 로컬 저장소로 폴백합니다.');
      return this.uploadToLocalStorage(file, fileName, 'drip');
    }

    try {
      const { data, error } = await supabase.storage
        .from(this.DRIPS_BUCKET)
        .upload(fileName, file, {
          contentType: 'image/jpeg',
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('Drip image upload error:', error);
        console.log(' Supabase 업로드 실패, 로컬 저장소로 폴백...');
        return this.uploadToLocalStorage(file, fileName, 'drip');
      }

      const { data: urlData } = supabase.storage
        .from(this.DRIPS_BUCKET)
        .getPublicUrl(fileName);

      return { success: true, url: urlData.publicUrl };
    } catch (error) {
      console.error('Drip image upload error:', error);
      console.log(' Supabase 업로드 실패, 로컬 저장소로 폴백...');
      return this.uploadToLocalStorage(file, fileName, 'drip');
    }
  }

  // 이미지 삭제
  static async deleteImage(bucket: string, fileName: string): Promise<boolean> {
    if (!supabase) {
      console.log('Supabase가 설정되지 않아 로컬 파일 삭제를 시도합니다.');
      try {
        const fs = require('fs');
        const path = require('path');
        const folder = bucket === this.PROFILES_BUCKET ? 'profiles' : 'drip';
        const filePath = path.join(process.cwd(), 'uploads', folder, fileName);
        
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          console.log(`로컬 파일 삭제 성공: ${fileName}`);
          return true;
        } else {
          console.log(`로컬 파일이 존재하지 않음: ${fileName}`);
          return true; // 파일이 없어도 삭제 성공으로 처리
        }
      } catch (error) {
        console.error('로컬 파일 삭제 실패:', error);
        return false;
      }
    }

    try {
      const { error } = await supabase.storage
        .from(bucket)
        .remove([fileName]);

      if (error) {
        console.error('Image deletion error:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Image deletion error:', error);
      return false;
    }
  }

  // 프로필 이미지 삭제
  static async deleteProfileImage(fileName: string): Promise<boolean> {
    return this.deleteImage(this.PROFILES_BUCKET, fileName);
  }

  // Drip 이미지 삭제
  static async deleteDripImage(fileName: string): Promise<boolean> {
    return this.deleteImage(this.DRIPS_BUCKET, fileName);
  }
} 