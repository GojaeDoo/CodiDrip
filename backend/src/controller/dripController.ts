import { Request, Response } from "express";
import { dripService } from "../service/dripService";
import { pool } from "../db";
import { RequestHandler } from "express";

export const createDrip = async (req: Request, res: Response) => {
  try {
    const { images, tags, userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    const result = await dripService.createDrip(images, tags, userId);
    res.status(201).json(result);
  } catch (error) {
    console.error("createDrip error - dripController:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUserDrip = async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId as string;
    const filterUserId = req.query.filterUserId as string | undefined;
    const gender = req.query.gender as string;
    const isLike = req.query.isLike === 'true';
    const drips = await dripService.getUserDrip(userId, filterUserId, gender, isLike);
    res.status(200).json(drips);
  } catch (error) {
    console.error("getUserDrip error - dripController:", error);
    res.status(500).json({ error: "getUserDrip 500error - dripController" });
  }
};

export const getPostNoDrip = async (req: Request, res: Response) => {
  try {
    const postNo = parseInt(req.params.postNo, 10);
    const userId = req.query.userId as string;
    if (isNaN(postNo)) {
      return res
        .status(400)
        .json({ error: "유효하지 않은 게시물 번호입니다." });
    }
    const drip = await dripService.getPostNoDrip(postNo, userId);
    res.status(200).json(drip);
  } catch (error) {
    console.error("getPostNoDrip error - dripController:", error);
    res.status(500).json({ error: "getPostNoDrip 500error - dripController" });
  }
};

export const updateDrip = async (req: Request, res: Response) => {
  try {
    const postNo = req.params.postNo;
    const { images, tags, userId } = req.body;

    if (!postNo || !images || !tags || !userId) {
      return res.status(400).json({ error: "필수 정보가 누락되었습니다." });
    }

    const updatedDrip = await dripService.updateDrip(
      postNo,
      images,
      tags,
      userId
    );
    res.status(200).json(updatedDrip);
  } catch (error) {
    console.error("updateDrip error - dripController:", error);
    res.status(500).json({ error: "게시물 수정 중 오류가 발생했습니다." });
  }
};

export const deleteDrip = async (req: Request, res: Response) => {
  try {
    const postNo = req.params.postNo;
    const result = await dripService.deleteDrip(postNo);
    res.status(200).json(result);
  } catch (error) {
    console.error("deleteDrip error - dripController:", error);
    res.status(500).json({ error: "게시물 삭제 중 오류가 발생했습니다." });
  }
};

export const getDripPostCommentController = async (req: Request, res: Response) => {
  const { postNo } = req.params;
  const userId = req.query.userId || req.body.userId;
  try {
    const result = await dripService.getDripPostCommentService(Number(postNo), userId as string);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '댓글 조회 중 오류가 발생했습니다.' });
  }
};

export const postDripPostCommentController = async (req: Request, res: Response) => {
  const { postNo } = req.params;
  const { user_id, content, parent_id } = req.body;
  
  try {
    const result = await pool.query(
      'INSERT INTO drip_post_comment (post_id, user_id, content, parent_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [postNo, user_id, content, parent_id || null]
    );
    
    // 사용자 정보 조회
    const userResult = await pool.query(
      'SELECT profile_nickname, profile_image FROM profile WHERE user_id = $1',
      [user_id]
    );
    
    const comment = {
      ...result.rows[0],
      user: userResult.rows[0]
    };
    
    res.json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '댓글 작성 중 오류가 발생했습니다.' });
  }
};

export const getDripPostRepliesController = async (req: Request, res: Response) => {
  const { commentId } = req.params;
  try {
    const replies = await dripService.getDripPostReplies(Number(commentId));
    res.json(replies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '답글 조회 중 오류가 발생했습니다.' });
  }
};

export const updateDripPostCommentController = async (req: Request, res: Response) => {
  const { commentId } = req.params;
  const { content } = req.body;

  try {
    await dripService.updateDripPostCommentService(Number(commentId), content);
    res.json({ message: '댓글이 수정되었습니다.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '댓글 수정 중 오류가 발생했습니다.' });
  }
};

export const deleteDripPostCommentController = async (req: Request, res: Response) => {
  const { commentId } = req.params;
  
  try {
    await pool.query('DELETE FROM drip_post_comment WHERE id = $1', [commentId]);
    res.json({ message: '댓글이 삭제되었습니다.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '댓글 삭제 중 오류가 발생했습니다.' });
  }
};

export const likeDripPostCommentController = async (req: Request, res: Response) => {
  const { commentId } = req.params;
  const userId = req.query.userId || req.body.userId;
  console.log('Like Comment Request:', {
    commentId,
    userId,
    body: req.body,
    query: req.query
  });

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const result = await dripService.likeDripPostCommentService(userId as string, Number(commentId));
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '댓글 좋아요 중 오류가 발생했습니다.' });
  }
};

export const unlikeDripPostCommentController = async (req: Request, res: Response) => {
  const { commentId } = req.params;
  const userId = req.query.userId || req.body.userId;
  console.log('Unlike Comment Request:', {
    commentId,
    userId,
    body: req.body,
    query: req.query
  });

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const result = await dripService.unlikeDripPostCommentService(userId as string, Number(commentId));
    res.json(result);
  } catch (err) {
    console.error('Unlike Comment Error:', err);
    res.status(500).json({ error: '댓글 좋아요 취소 중 오류가 발생했습니다.' });
  }
};

export const postDripPostReplyController = async (req: Request, res: Response) => {
  const { postNo, user_id, content, parent_id } = req.body;

  try { 
    const result = await pool.query(    
      'INSERT INTO drip_post_comment (post_id, user_id, content, parent_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [postNo, user_id, content, parent_id || null]
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '댓글 작성 중 오류가 발생했습니다.' });
  }
};

export const likeDripPostController = async (req: Request, res: Response) => {
  try {
    const postNo = parseInt(req.params.postNo, 10);
    const userId = req.query.userId || req.body.userId;
    console.log('Like Post Request:', {
      postNo,
      userId,
      body: req.body,
      query: req.query
    });

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const result = await dripService.likeDripPostService(userId as string, postNo);
    res.json({
      success: true,
      liked: result.liked,
      likeCount: result.likeCount
    });
  } catch (error) {
    console.error("likeDripPostController error:", error);
    res.status(500).json({ error: "Failed to like post" });
  }
};

export const unlikeDripPostController = async (req: Request, res: Response) => {
  try {
    const postNo = parseInt(req.params.postNo, 10);
    const userId = req.query.userId || req.body.userId;
    console.log('Unlike Post Request:', {
      postNo,
      userId,
      body: req.body,
      query: req.query
    });

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const result = await dripService.unlikeDripPostService(userId as string, postNo);
    res.json({
      success: true,
      liked: false,
      likeCount: result.likeCount
    });
  } catch (error) {
    console.error("unlikeDripPostController error:", error);
    res.status(500).json({ error: "Failed to unlike post" });
  }
};

export const getDripPostLikeStatusController = async (req: Request, res: Response) => {
  try {
    const userId = req.query.user_id as string;
    const postNo = parseInt(req.query.post_no as string, 10);

    if (!userId || isNaN(postNo)) {
      console.log("유효하지 않은 파라미터:", { userId, postNo });
      return res.status(400).json({ error: "user_id와 post_no가 필요합니다." });
    }
    
    const isLiked = await dripService.getDripPostLikeStatusService(userId, postNo);
    console.log("좋아요 상태:", isLiked);
    res.json({ is_liked: isLiked });
  } catch (error) {
    console.error("getDripPostLikeStatusController error:", error);
    res.status(500).json({ error: "좋아요 상태 조회 중 오류가 발생했습니다." });
  }
};

export const saveDripPostController = async (req: Request, res : Response) => {
  try {
    const postNo = parseInt(req.params.postNo, 10);
    const userId = req.body.userId;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    if (isNaN(postNo)) {
      return res.status(400).json({ error: "Invalid post number" });
    }

    const result = await dripService.saveDripPostService(postNo, userId);
    res.json(result);
  } catch (error) {
    console.error("saveDripPostController error:", error);
    res.status(500).json({ error: "Failed to save post" });
  }
}

export const getDripPostSaveStatusController = async (req: Request, res: Response) => {
  try {
    const postNo = parseInt(req.params.postNo, 10);
    const userId = req.query.userId as string;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    if (isNaN(postNo)) {
      return res.status(400).json({ error: "Invalid post number" });
    }

    const saved = await dripService.getDripPostSaveStatusService(postNo, userId);
    res.json({ saved });
  } catch (error) {
    console.error("getDripPostSaveStatusController error:", error);
    res.status(500).json({ error: "Failed to get save status" });
  }
};