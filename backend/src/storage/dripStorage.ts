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

export const createDripDB = async (
  images: string[],
  tags: string[],
  userId: string
) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const result = await client.query(
      `INSERT INTO drip_post (post_image, post_tag, user_id) 
       VALUES ($1, $2, $3) 
       RETURNING post_no`,
      [JSON.stringify(images), JSON.stringify(tags), userId]
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

export const getUserDripPost = async (userId?: string, gender?: string) => {
  try {
    let query = `
      SELECT 
        p.post_no as "게시글번호",
        p.post_image as "게시글이미지",
        p.post_tag as "태그",
        p.user_id,
        pr.profile_image as "프로필이미지",
        pr.profile_nickname as "닉네임",
        pr.profile_height as "키",
        pr.profile_weight as "몸무게"
      FROM drip_post p
      JOIN profile pr ON p.user_id = pr.user_id
    `;

    const params: any[] = [];
    const conditions: string[] = [];

    if (userId) {
      conditions.push("p.user_id = $" + (params.length + 1));
      params.push(userId);
    }

    if (gender) {
      conditions.push("pr.profile_gender = $" + (params.length + 1));
      params.push(gender);
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

export const getPostNoDripPost = async (postNo: number) => {
  try {
    console.log("Searching for post_no:", postNo);
    const result = await pool.query(
      `
      SELECT 
        p.post_no AS 게시글번호,
        p.post_image AS 게시글이미지,
        p.post_tag AS 태그,
        p.user_id,
        pr.profile_image AS 프로필이미지,
        pr.profile_nickname AS 닉네임,
        pr.profile_height AS 키,
        pr.profile_weight AS 몸무게
      FROM drip_post p
      JOIN profile pr ON p.user_id = pr.user_id
      WHERE post_no = $1
    `,
      [postNo]
    );
    console.log("Query result rows:", result.rows); // 디버깅용 로그
    return result.rows[0];
  } catch (error) {
    console.error("Error in getPostNoDripPost:", error);
    throw error;
  }
};

export const getDripPostCommentStorage = async (postNo: number, userId?: string) => {
  try {
    const result = await pool.query(
      `
        SELECT 
          dpc.id,
          dpc.content,
          dpc.created_at,
          dpc.post_id,
          dpc.parent_id,
          p.profile_nickname,
          p.profile_image,
          (SELECT COUNT(*) FROM drip_post_comment_like dcl WHERE dcl.comment_id = dpc.id) AS like_count,
          EXISTS (
            SELECT 1 FROM drip_post_comment_like dcl2 WHERE dcl2.comment_id = dpc.id AND dcl2.user_id = $2
          ) AS liked
        FROM drip_post_comment dpc
        JOIN profile p ON p.user_id = dpc.user_id
        WHERE dpc.post_id = $1
        ORDER BY dpc.created_at DESC
      `,
      [postNo, userId || null]
    );

    // 데이터 구조 변환
    return result.rows.map(row => ({
      id: row.id,
      content: row.content,
      created_at: row.created_at,
      post_id: row.post_id,
      parent_id: row.parent_id,
      profile_nickname: row.profile_nickname,
      profile_image: row.profile_image,
      like_count: row.like_count,
      liked: row.liked,
    }));
  } catch (error) {
    console.error("Error in getDripPostCommentStorage:", error);
    return [];
  }
};

export const updateDripPost = async (
  postNo: string,
  images: string[],
  tags: string[],
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
       SET post_image = $1, post_tag = $2
       WHERE post_no = $3 AND user_id = $4
       RETURNING *`,
      [JSON.stringify(images), JSON.stringify(tags), postNo, userId]
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

export const deleteDripPost = async (postNo: string) => {
  try {
    const result = await pool.query(
      `DELETE FROM drip_post WHERE post_no = $1`,
      [postNo]
    );
    return result.rows[0];
  } catch (error) {
    console.error("deleteDripPost error - dripStorage:", error);
    throw error;
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

export const updateDripPostCommentStorage = async (commentId: number, content: string) => {
  const result = await pool.query(
    'UPDATE drip_post_comment SET content = $1 WHERE id = $2 RETURNING *',
    [content, commentId]
  );
  return result.rows[0];
};

export const likeDripPostCommentStorage = async (userId: string, commentId: number) => {
  const result = await pool.query(
    `INSERT INTO drip_post_comment_like (user_id, comment_id) VALUES ($1, $2) ON CONFLICT DO NOTHING RETURNING *`,
    [userId, commentId]
  );
  return result.rows[0];
};

export const unlikeDripPostCommentStorage = async (userId: string, commentId: number) => {
  const result = await pool.query(
    `DELETE FROM drip_post_comment_like WHERE user_id = $1 AND comment_id = $2 RETURNING *`,
    [userId, commentId]
  );
  return result.rows[0];
};
