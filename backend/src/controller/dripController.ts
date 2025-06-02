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
    const gender = req.query.gender as string;
    const drips = await dripService.getUserDrip(userId, gender);
    res.status(200).json(drips);
  } catch (error) {
    console.error("getUserDrip error - dripController:", error);
    res.status(500).json({ error: "getUserDrip 500error - dripController" });
  }
};

export const getPostNoDrip = async (req: Request, res: Response) => {
  try {
    const postNo = parseInt(req.params.postNo, 10);
    if (isNaN(postNo)) {
      return res
        .status(400)
        .json({ error: "유효하지 않은 게시물 번호입니다." });
    }
    const drip = await dripService.getPostNoDrip(postNo);
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
  const userId = req.body.user_id || req.query.user_id;
  try {
    await dripService.likeDripPostCommentService(userId, Number(commentId));
    res.json({ message: '댓글 좋아요 완료' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '댓글 좋아요 중 오류가 발생했습니다.' });
  }
};

export const unlikeDripPostCommentController = async (req: Request, res: Response) => {
  const { commentId } = req.params;
  const userId = req.body.user_id || req.query.user_id;
  console.log('Unlike Comment Request:', {
    commentId,
    userId,
    body: req.body,
    query: req.query
  });
  try {
    await dripService.unlikeDripPostCommentService(userId, Number(commentId));
    res.json({ message: '댓글 좋아요 취소 완료' });
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

export const likeDripPostController: RequestHandler = async (req, res) => {
  try {
    const { postNo } = req.params;
    const { user_id } = req.body;
    const result = await dripService.likeDripPostService(user_id, Number(postNo));
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "게시글 좋아요 실패" });
  }
};

export const unlikeDripPostController: RequestHandler = async (req, res) => {
  try {
    const { postNo } = req.params;
    const { user_id } = req.body;
    const result = await dripService.unlikeDripPostService(user_id, Number(postNo));
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "게시글 좋아요 취소 실패" });
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