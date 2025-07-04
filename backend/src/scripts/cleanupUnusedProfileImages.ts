import { supabase } from "../supabase";
import { pool } from "../db";

async function cleanupUnusedProfileImages() {
  try {
    // 1. DB에 저장된 모든 profile_image url 목록 가져오기
    const { rows } = await pool.query("SELECT profile_image FROM profile");
    const usedImages = new Set(
      rows
        .map((r) => {
          if (!r.profile_image) return null;
          // supabase public url이면 파일명만 추출
          if (
            r.profile_image.startsWith("http") &&
            r.profile_image.includes("supabase.co")
          ) {
            return r.profile_image.split("/").pop();
          }
          return null;
        })
        .filter(Boolean)
    );

    // 2. Supabase Storage의 모든 파일 목록 가져오기
    const { data: files, error } = await supabase.storage.from("profiles").list();
    if (error) {
      console.error("Supabase 파일 목록 조회 실패:", error.message);
      return;
    }
    if (!files) {
      return;
    }

    // 3. DB에 없는 파일은 삭제
    for (const file of files) {
      if (!usedImages.has(file.name)) {
        const { error: delError } = await supabase.storage.from("profiles").remove([file.name]);
        if (delError) {
          console.error("임시 이미지 삭제 실패:", file.name, delError.message);
        }
      }
    }
  } catch (err) {
    console.error("cleanupUnusedProfileImages 스크립트 오류:", err);
  } finally {
    await pool.end();
  }
}

cleanupUnusedProfileImages(); 