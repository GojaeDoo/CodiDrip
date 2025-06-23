import { pool } from "../db";

export const createFreeBoardDB = async (title: string, content: string, userId: string) => {
    try {
        // profile 테이블에서 nickname 가져오기
        const profileResult = await pool.query(
            "SELECT profile_nickname FROM profile WHERE user_id = $1",
            [userId]
        );
        
        const profileNickname = profileResult.rows[0]?.profile_nickname || "익명";
        
        // 게시글 삽입
        const insertResult = await pool.query(
            "INSERT INTO freeBoard (title, content, user_id, profile_nickname) VALUES ($1, $2, $3, $4) RETURNING *",
            [title, content, userId, profileNickname]
        );
        
        return insertResult.rows[0];
    } catch (error) {
        console.error("createFreeBoardDB error - freeBoardStorage:", error);
        throw new Error("createFreeBoardDB 500error - freeBoardStorage");
    }
}

export const getFreeBoardListDB = async () => {
    try {
        const result = await pool.query(
            "SELECT id, title, profile_nickname as author, created_at as \"createdAt\", view_count as \"viewCount\" FROM freeBoard ORDER BY created_at DESC"
        );
        return result.rows;
    } catch (error) {
        console.error("getFreeBoardListDB error - freeBoardStorage:", error);
        throw new Error("getFreeBoardListDB 500error - freeBoardStorage");
    }
}

export const getFreeBoardDetailDB = async (postId: number) => {
    try {
        // 조회수 증가
        await pool.query(
            "UPDATE freeBoard SET view_count = view_count + 1 WHERE id = $1",
            [postId]
        );
        
        // 게시글 상세 정보 조회
        const result = await pool.query(
            "SELECT id, title, user_id, content, profile_nickname as author, created_at as \"createdAt\", view_count as \"viewCount\" FROM freeBoard WHERE id = $1",
            [postId]
        );
        
        return result.rows[0];
    } catch (error) {
        console.error("getFreeBoardDetailDB error - freeBoardStorage:", error);
        throw new Error("getFreeBoardDetailDB 500error - freeBoardStorage");
    }
}

export const updateFreeBoardDB = async (postId: number, title: string, content: string, userId: string) => {
    try {
        console.log("updateFreeBoardDB 호출됨:", { postId, title, content, userId });
        
        // 작성자 확인
        const authorCheck = await pool.query(
            "SELECT user_id FROM freeBoard WHERE id = $1",
            [postId]
        );
        
        console.log("작성자 확인 결과:", authorCheck.rows);
        
        if (authorCheck.rows.length === 0) {
            throw new Error("게시글을 찾을 수 없습니다.");
        }
        
        if (authorCheck.rows[0].user_id !== userId) {
            throw new Error("수정 권한이 없습니다.");
        }
        
        // 게시글 수정 (updated_at 컬럼 제거)
        const result = await pool.query(
            "UPDATE freeBoard SET title = $1, content = $2 WHERE id = $3 RETURNING *",
            [title, content, postId]
        );
        
        console.log("수정 결과:", result.rows);
        
        return result.rows[0];
    } catch (error) {
        console.error("updateFreeBoardDB error - freeBoardStorage:", error);
        throw error; // 원본 에러를 그대로 전달
    }
}

export const deleteFreeBoardDB = async (postId: number) => {
    try {
        const result = await pool.query(
            "DELETE FROM freeBoard WHERE id = $1",
            [postId]
        );
        return result.rowCount;
    } catch (error) {
        console.error("deleteFreeBoardDB error - freeBoardStorage:", error);
        throw new Error("deleteFreeBoardDB 500error - freeBoardStorage");
    }
}