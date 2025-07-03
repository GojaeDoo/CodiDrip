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

  // 프로필 이미지 업로드
  static async uploadProfileImage(file: Buffer, fileName: string): Promise<UploadResult> {
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
        return { success: false, error: error.message };
      }

      const { data: urlData } = supabase.storage
        .from(this.PROFILES_BUCKET)
        .getPublicUrl(fileName);

      return { success: true, url: urlData.publicUrl };
    } catch (error) {
      console.error('Profile image upload error:', error);
      console.log('🔄 Supabase 업로드 실패, 로컬 저장소로 폴백...');
      
      // 로컬 저장소로 폴백
      try {
        const fs = require('fs');
        const path = require('path');
        const uploadDir = path.join(__dirname, '../../uploads/profiles');
        
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        
        const filePath = path.join(uploadDir, fileName);
        fs.writeFileSync(filePath, file);
        
        return { 
          success: true, 
          url: `https://codidrip-backend.onrender.com/uploads/profiles/${fileName}`,
          fallback: true 
        };
      } catch (fallbackError) {
        console.error('Fallback upload error:', fallbackError);
        return { success: false, error: 'Upload failed' };
      }
    }
  }

  // Drip 이미지 업로드
  static async uploadDripImage(file: Buffer, fileName: string): Promise<UploadResult> {
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
        return { success: false, error: error.message };
      }

      const { data: urlData } = supabase.storage
        .from(this.DRIPS_BUCKET)
        .getPublicUrl(fileName);

      return { success: true, url: urlData.publicUrl };
    } catch (error) {
      console.error('Drip image upload error:', error);
      console.log('🔄 Supabase 업로드 실패, 로컬 저장소로 폴백...');
      
      // 로컬 저장소로 폴백
      try {
        const fs = require('fs');
        const path = require('path');
        const uploadDir = path.join(__dirname, '../../uploads/drip');
        
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        
        const filePath = path.join(uploadDir, fileName);
        fs.writeFileSync(filePath, file);
        
        return { 
          success: true, 
          url: `https://codidrip-backend.onrender.com/uploads/drip/${fileName}`,
          fallback: true 
        };
      } catch (fallbackError) {
        console.error('Fallback upload error:', fallbackError);
        return { success: false, error: 'Upload failed' };
      }
    }
  }

  // 이미지 삭제
  static async deleteImage(bucket: string, fileName: string): Promise<boolean> {
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