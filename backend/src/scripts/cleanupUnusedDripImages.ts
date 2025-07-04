import { supabase } from "../supabase";
import { pool } from "../db";

async function cleanupUnusedDripImages() {
  try {
    // 1. DB에 저장된 모든 drip 이미지 url 목록 가져오기
    const { rows } = await pool.query("SELECT images FROM drip_post");
    // images 컬럼이 배열(string[])일 경우 모두 펼쳐서 파일명 추출
    const usedImages = new Set();
    for (const row of rows) {
      if (!row.images) continue;
      let imagesArr: string[] = [];
      if (Array.isArray(row.images)) {
        imagesArr = row.images;
      } else if (typeof row.images === "string") {
        try {
          imagesArr = JSON.parse(row.images);
        } catch {
          imagesArr = [row.images];
        }
      }
      for (const img of imagesArr) {
        if (!img) continue;
        if (img.startsWith("http") && img.includes("supabase.co")) {
          usedImages.add(img.split("/").pop());
        }
      }
    }

    // 2. Supabase Storage의 모든 파일 목록 가져오기
    const { data: files, error } = await supabase.storage.from("drips").list();
    if (error) {
      console.error("Supabase 파일 목록 조회 실패:", error.message);
      return;
    }
    if (!files) {
      console.log("Supabase Storage에 파일이 없습니다.");
      return;
    }

    // 3. DB에 없는 파일은 삭제
    for (const file of files) {
      if (!usedImages.has(file.name)) {
        const { error: delError } = await supabase.storage.from("drips").remove([file.name]);
        if (delError) {
          console.error("임시 Drip 이미지 삭제 실패:", file.name, delError.message);
        } else {
          console.log("임시 Drip 이미지 삭제 성공:", file.name);
        }
      }
    }
    console.log(" 불필요한 Drip 이미지 정리 완료");
  } catch (err) {
    console.error("cleanupUnusedDripImages 스크립트 오류:", err);
  } finally {
    await pool.end();
  }
}

cleanupUnusedDripImages(); 