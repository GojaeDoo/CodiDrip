import { v4 as uuidv4 } from "uuid";
import { pool } from "../db";
import fs from "fs";
import path from "path";

const uploadDir = path.join(process.cwd(), "uploads/drip");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

export const uploadDripImage = async (
  buffer: Buffer,
  contentType: string
): Promise<string> => {
  try {
    const extension = contentType.split("/")[1] || "jpg";
    const filename = `${uuidv4()}.${extension}`;
    const filepath = path.join(uploadDir, filename);

    await fs.promises.writeFile(filepath, buffer);

    return `/${filename}`;
  } catch (error) {
    console.error("uploadDripImage error - dripStorage:", error);
    throw error;
  }
};

export const postCreateDripStorage = async (
  images: string[],
  tags: string[],
  styleCategory: string,
  userId: string
) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const result = await client.query(
      `INSERT INTO drip_post (post_image, post_tag, style_category, user_id) 
       VALUES ($1, $2, $3, $4) 
       RETURNING post_no`,
      [JSON.stringify(images), JSON.stringify(tags), styleCategory, userId]
    );

    await client.query("COMMIT");

    return result.rows[0];
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

export const getUserDripPostStorage = async (userId?: string, filterUserId?: string, gender?: string, isLike?: boolean, isSaved?: boolean, styles?: string) => {
  try {
    let query = `
      WITH user_likes AS (
        SELECT post_no 
        FROM drip_post_like 
        WHERE user_id = $1::TEXT
      ),
      user_saves AS (
        SELECT post_no 
        FROM drip_post_mark 
        WHERE user_id = $1::TEXT
      )
      SELECT 
        p.post_no AS "게시글번호",
        p.post_image AS "게시글이미지",
        p.post_tag AS "태그",
        p.style_category AS "스타일카테고리",
        p.user_id,
        pr.profile_image AS "프로필이미지",
        pr.profile_nickname AS "닉네임",
        pr.profile_height AS "키",
        pr.profile_weight AS "몸무게",
        (SELECT COUNT(*) FROM drip_post_comment WHERE post_id = p.post_no) AS "댓글 개수",
        (SELECT COUNT(*) FROM drip_post_like WHERE post_no = p.post_no) AS "좋아요 개수",
        CASE 
          WHEN $1 IS NULL THEN false
          ELSE EXISTS (
            SELECT 1 FROM user_likes ul WHERE ul.post_no = p.post_no
          )
        END AS liked,
        CASE 
          WHEN $1 IS NULL THEN false
          ELSE EXISTS (
            SELECT 1 FROM user_saves us WHERE us.post_no = p.post_no
          )
        END AS saved
      FROM drip_post p
      JOIN profile pr ON p.user_id = pr.user_id
      JOIN users u ON pr.user_id = u.user_id
    `;

    const params: (string | undefined)[] = [userId];
    const conditions: string[] = [];

    // 관리자 계정 제외 (일반 사용자만 조회)
    conditions.push("u.is_admin = false");

    // 마이페이지에서 특정 사용자의 게시글만 필터 (좋아요/저장 필터가 없을 때만)
    if (filterUserId && !isLike && !isSaved) {
      conditions.push("p.user_id = $" + (params.length + 1));
      params.push(filterUserId);
    }

    // 성별 필터링 (좋아요/저장 필터가 없을 때만)
    if (gender && !isLike && !isSaved) {
      conditions.push("pr.profile_gender = $" + (params.length + 1));
      params.push(gender);
    }

    // 스타일 카테고리 필터링
    if (styles) {
      const styleArray = styles.split(',');
      const stylePlaceholders = styleArray.map((_, index) => `$${params.length + index + 1}`).join(',');
      conditions.push(`p.style_category = ANY(ARRAY[${stylePlaceholders}])`);
      params.push(...styleArray);
    }

    // 좋아요한 게시글만 필터링
    if (isLike && userId) {
      conditions.push(`EXISTS (
        SELECT 1 FROM drip_post_like dpl 
        WHERE dpl.post_no = p.post_no 
        AND dpl.user_id = $1
      )`);
    }

    // 저장한 게시글만 필터링
    if (isSaved && userId) {
      conditions.push(`EXISTS (
        SELECT 1 FROM drip_post_mark dpm 
        WHERE dpm.post_no = p.post_no 
        AND dpm.user_id = $1
      )`);
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    query += " ORDER BY p.post_no DESC";


    const result = await pool.query(query, params);
    return result.rows;
  } catch (error) {
    console.error("Error in getUserDripPost:", error);
    throw error;
  }
};

export const getPostNoDripPostStorage = async (postNo: number, userId?: string) => {
  try {
    const result = await pool.query(
      `
      WITH user_likes AS (
        SELECT post_no 
        FROM drip_post_like 
        WHERE user_id = $2::TEXT
      )
      SELECT 
        p.post_no AS 게시글번호,
        p.post_image AS 게시글이미지,
        p.post_tag AS 태그,
        p.style_category AS 스타일카테고리,
        p.user_id,
        pr.profile_image AS 프로필이미지,
        pr.profile_nickname AS 닉네임,
        pr.profile_height AS 키,
        pr.profile_weight AS 몸무게,
        (SELECT COUNT(*) FROM drip_post_comment WHERE post_id = p.post_no) AS "댓글 개수",
        (SELECT COUNT(*) FROM drip_post_like WHERE post_no = p.post_no) AS "좋아요 개수",
        CASE 
          WHEN $2 IS NULL THEN false
          ELSE EXISTS (
            SELECT 1 FROM user_likes ul WHERE ul.post_no = p.post_no
          )
        END AS liked
      FROM drip_post p
      JOIN profile pr ON p.user_id = pr.user_id
      JOIN users u ON pr.user_id = u.user_id
      WHERE post_no = $1 AND u.is_admin = false
    `,
      [postNo, userId]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error in getPostNoDripPost:", error);
    throw error;
  }
};

export const getDripPostCommentStorage = async (
  postNo: number,
  userId?: string
) => {
  try {

    const result = await pool.query(
      `
        WITH user_likes AS (
          SELECT comment_id 
          FROM drip_post_comment_like 
          WHERE user_id = $2::TEXT
        )
        SELECT 
          dpc.id,
          dpc.content,
          dpc.created_at,
          dpc.post_id,
          dpc.parent_id,
          dpc.user_id,
          p.profile_nickname,
          p.profile_image,
          CAST((SELECT COUNT(*) FROM drip_post_comment_like dcl WHERE dcl.comment_id = dpc.id) AS INTEGER) AS like_count,
          CASE 
            WHEN $2 IS NULL THEN false
            ELSE EXISTS (
              SELECT 1 FROM user_likes ul WHERE ul.comment_id = dpc.id
            )
          END AS liked
        FROM drip_post_comment dpc
        JOIN profile p ON p.user_id = dpc.user_id
        WHERE dpc.post_id = $1
        ORDER BY dpc.created_at DESC
      `,
      [postNo, userId]
    );


    // 데이터 구조 변환
    const comments = result.rows.map((row) => ({
      id: row.id,
      content: row.content,
      created_at: row.created_at,
      post_id: row.post_id,
      parent_id: row.parent_id,
      user_id: row.user_id,
      profile_nickname: row.profile_nickname,
      profile_image: row.profile_image,
      like_count: Number(row.like_count),
      liked: Boolean(row.liked),
    }));

    return comments;
  } catch (error) {
    console.error("Error in getDripPostCommentStorage:", error);
    return [];
  }
};

export const postUpdateDripPostStorage = async (
  postNo: string,
  images: string[],
  tags: string[],
  styleCategory: string,
  userId: string
) => {
  try {
    // 기존 이미지 목록 조회
    const prevResult = await pool.query(
      `SELECT post_image FROM drip_post WHERE post_no = $1 AND user_id = $2`,
      [postNo, userId]
    );
    let prevImages: string[] = [];
    if (prevResult.rows.length > 0) {
      try {
        prevImages = JSON.parse(prevResult.rows[0].post_image);
      } catch (e) {
        prevImages = [];
      }
    }

    // 삭제 대상 이미지 추출
    const imagesToDelete = prevImages.filter(
      (img) =>
        !images.includes(img) &&
        typeof img === "string" &&
        !img.startsWith("data:")
    );
    // 파일 시스템에서 삭제
    for (const img of imagesToDelete) {
      const filePath = path.join(
        process.cwd(),
        "uploads/drip",
        img.replace(/^\//, "")
      );
      fs.promises.unlink(filePath).catch((err) => {
        // 파일이 없거나 삭제 실패해도 무시
        console.error("이미지 파일 삭제 실패:", filePath, err.message);
      });
    }

    // DB 업데이트
    const result = await pool.query(
      `UPDATE drip_post 
       SET post_image = $1, post_tag = $2, style_category = $3
       WHERE post_no = $4 AND user_id = $5
       RETURNING *`,
      [JSON.stringify(images), JSON.stringify(tags), styleCategory, postNo, userId]
    );

    if (result.rows.length === 0) {
      throw new Error("게시물을 찾을 수 없거나 수정 권한이 없습니다.");
    }

    return result.rows[0];
  } catch (error) {
    console.error("updateDripPost error - dripStorage:", error);
    throw error;
  }
};

export const deleteDripPostStorage = async (postNo: number) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // 1. 먼저 댓글의 좋아요들을 삭제
    await client.query(
      `DELETE FROM drip_post_comment_like 
       WHERE comment_id IN (
         SELECT id FROM drip_post_comment WHERE post_id = $1
       )`,
      [postNo]
    );

    // 2. 그 다음 댓글들을 삭제
    await client.query(`DELETE FROM drip_post_comment WHERE post_id = $1`, [
      postNo,
    ]);

    // 3. 마지막으로 게시글 삭제
    const result = await client.query(
      `DELETE FROM drip_post WHERE post_no = $1 RETURNING *`,
      [postNo]
    );

    await client.query("COMMIT");
    return result.rows[0];
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("deleteDripPostStorage error:", error);
    throw error;
  } finally {
    client.release();
  }
};

export const postDripPostCommentStorage = async (
  userId: string,
  postComment: string,
  postId: string,
  parentId: string | null = null
) => {
  try {
    const result = await pool.query(
      `INSERT INTO drip_post_comment (user_id, post_id, content, parent_id)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [userId, postId, postComment, parentId]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error in postDripPostCommentStorage:", error);
    throw error;
  }
};

export const getDripPostDetail = async (postNo: number) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const postResult = await client.query(
      `SELECT p.*, pr.profile_nickname 
       FROM drip_post p 
       LEFT JOIN profile pr ON p.user_id = pr.user_id 
       WHERE p.post_no = $1`,
      [postNo]
    );

    if (!postResult.rows || postResult.rows.length === 0) {
      throw new Error("Post not found");
    }

    const post = postResult.rows[0];

    await client.query("COMMIT");

    return post;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

export const getDripPostRepliesStorage = async (commentId: number) => {
  const result = await pool.query(
    `SELECT c.*, p.profile_nickname, p.profile_image
     FROM drip_post_comment c
     LEFT JOIN profile p ON c.user_id = p.user_id
     WHERE c.parent_id = $1
     ORDER BY c.created_at ASC`,
    [commentId]
  );
  return result.rows;
};

export const updateDripPostCommentStorage = async (
  commentId: number,
  content: string
) => {
  const result = await pool.query(
    "UPDATE drip_post_comment SET content = $1 WHERE id = $2 RETURNING *",
    [content, commentId]
  );
  return result.rows[0];
};

export const likeDripPostCommentStorage = async (
  userId: string,
  commentId: number
) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");


    // 먼저 이미 좋아요를 눌렀는지 확인
    const checkResult = await client.query(
      `SELECT 1 FROM drip_post_comment_like WHERE user_id = $1::TEXT AND comment_id = $2`,
      [userId, commentId]
    );


    // 이미 좋아요를 눌렀다면 좋아요 취소
    if (checkResult.rows.length > 0) {
      const unlikeResult = await client.query(
        `DELETE FROM drip_post_comment_like 
         WHERE user_id = $1::TEXT AND comment_id = $2 
         RETURNING *`,
        [userId, commentId]
      );
      await client.query("COMMIT");
      return unlikeResult.rows[0];
    }

    // 좋아요 추가
    const result = await client.query(
      `INSERT INTO drip_post_comment_like (user_id, comment_id) 
       VALUES ($1::TEXT, $2) 
       RETURNING *`,
      [userId, commentId]
    );


    await client.query("COMMIT");
    return result.rows[0];
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error in likeDripPostCommentStorage:", error);
    throw error;
  } finally {
    client.release();
  }
};

export const unlikeDripPostCommentStorage = async (
  userId: string,
  commentId: number
) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");


    // 좋아요 취소
    const result = await client.query(
      `DELETE FROM drip_post_comment_like 
       WHERE user_id = $1::TEXT AND comment_id = $2 
       RETURNING *`,
      [userId, commentId]
    );

    if (result.rows.length === 0) {
      await client.query("COMMIT");
      return null;
    }

    await client.query("COMMIT");
    return result.rows[0];
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error in unlikeDripPostCommentStorage:", error);
    throw error;
  } finally {
    client.release();
  }
};

export const postDripPostReplyStorage = async (
  userId: string,
  postReply: string,
  postNo: string,
  parentId: string
) => {
  const result = await pool.query(
    `INSERT INTO drip_post_comment (user_id, post_id, content, parent_id)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [userId, postNo, postReply, parentId]
  );
  return result.rows[0];
};

export const likeDripPostStorage = async (userId: string, postNo: number) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // 이미 좋아요를 눌렀는지 확인
    const checkResult = await client.query(
      "SELECT * FROM drip_post_like WHERE user_id = $1 AND post_no = $2",
      [userId, postNo]
    );

    if (checkResult.rows.length > 0) {
      // 이미 좋아요를 눌렀다면 좋아요 취소
      await client.query(
        "DELETE FROM drip_post_like WHERE user_id = $1 AND post_no = $2",
        [userId, postNo]
      );
    } else {
      // 좋아요를 누르지 않았다면 좋아요 추가
      await client.query(
        "INSERT INTO drip_post_like (user_id, post_no, is_like) VALUES ($1, $2, true)",
        [userId, postNo]
      );
    }

    // 좋아요 개수 조회
    const likeCountResult = await client.query(
      "SELECT COUNT(*) FROM drip_post_like WHERE post_no = $1",
      [postNo]
    );

    await client.query("COMMIT");

    return {
      success: true,
      liked: checkResult.rows.length === 0,
      likeCount: parseInt(likeCountResult.rows[0].count)
    };
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("likeDripPostStorage error:", error);
    throw error;
  } finally {
    client.release();
  }
};

export const unlikeDripPostStorage = async (userId: string, postNo: number) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // 좋아요 취소
    await client.query(
      "DELETE FROM drip_post_like WHERE user_id = $1 AND post_no = $2",
      [userId, postNo]
    );

    // 좋아요 개수 조회
    const likeCountResult = await client.query(
      "SELECT COUNT(*) FROM drip_post_like WHERE post_no = $1",
      [postNo]
    );

    await client.query("COMMIT");

    return {
      success: true,
      liked: false,
      likeCount: parseInt(likeCountResult.rows[0].count)
    };
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("unlikeDripPostStorage error:", error);
    throw error;
  } finally {
    client.release();
  }
};

export const getDripPostLikeStatusStorage = async (
  userId: string,
  postNo: number
) => {
  try {
    const result = await pool.query(
      "SELECT is_like FROM drip_post_like WHERE user_id = $1 AND post_no = $2",
      [userId, postNo]
    );
    if (result.rows.length === 0) return false;
    return result.rows[0].is_like;
  } catch (error) {
    console.error("getDripPostLikeStatusStorage error:", error);
    throw error;
  }
};

export const saveDripPostStorage = async (postNo: number, userId: string) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // 이미 저장했는지 확인
    const checkResult = await client.query(
      "SELECT * FROM drip_post_mark WHERE user_id = $1 AND post_no = $2",
      [userId, postNo]
    );

    if (checkResult.rows.length > 0) {
      // 이미 저장했다면 저장 취소
      await client.query(
        "DELETE FROM drip_post_mark WHERE user_id = $1 AND post_no = $2",
        [userId, postNo]
      );
      await client.query("COMMIT");
      return { saved: false };
    } else {
      // 저장하지 않았다면 저장 추가
      await client.query(
        "INSERT INTO drip_post_mark (user_id, post_no) VALUES ($1, $2)",
        [userId, postNo]
      );
      await client.query("COMMIT");
      return { saved: true };
    }
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("saveDripPostStorage error:", error);
    throw error;
  } finally {
    client.release();
  }
};

export const getDripPostSaveStatusStorage = async (postNo: number, userId: string) => {
  try {
    const result = await pool.query(
      "SELECT * FROM drip_post_mark WHERE user_id = $1 AND post_no = $2",
      [userId, postNo]
    );
    return result.rows.length > 0;
  } catch (error) {
    console.error("getDripPostSaveStatusStorage error:", error);
    throw error;
  }
};