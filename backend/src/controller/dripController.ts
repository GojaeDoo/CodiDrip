import { Request, Response } from "express";
import { dripService } from "../service/dripService";
import { pool } from "../db";
import { RequestHandler } from "express";
import { StorageService } from "../service/storageService";
import { supabase } from "../supabase";

export const postCreateDripController = async (req: Request, res: Response) => {
  try {
    const { images, tags, styleCategory, userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    if (!styleCategory) {
      return res.status(400).json({ error: "styleCategory is required" });
    }

    const result = await dripService.postCreateDripService(images, tags, styleCategory, userId);
    res.status(201).json(result);
  } catch (error) {
    console.error("createDrip error - dripController:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUserDripController = async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId as string;
    const filterUserId = req.query.filterUserId as string | undefined;
    const gender = req.query.gender as string;
    const isLike = req.query.isLike === 'true';
    const isSaved = req.query.isSaved === 'true';
    const styles = req.query.styles as string | undefined;
    
    const drips = await dripService.getUserDripService(userId, filterUserId, gender, isLike, isSaved, styles);
    
    // Supabase Storage에서 실제 이미지 URL 가져오기
    if (supabase) {
      const { data: dripImages } = await supabase.storage
        .from('drips')
        .list('', { limit: 100 });
      
      const imageMap = new Map();
      if (dripImages) {
        for (const file of dripImages) {
          const { data: urlData } = supabase.storage
            .from('drips')
            .getPublicUrl(file.name);
          imageMap.set(file.name, urlData.publicUrl);
        }
      }
      
      // Drip 데이터에 실제 이미지 URL 적용
      const dripsWithImages = drips.map((drip: any) => {
        if (drip.게시글이미지) {
          try {
            const images = JSON.parse(drip.게시글이미지);
            const updatedImages = images.map((img: string) => {
              if (img && !img.startsWith('http')) {
                // 파일명만 추출
                const fileName = img.replace(/^.*[\\\/]/, '');
                const actualUrl = imageMap.get(fileName);
                if (actualUrl) {
                  return actualUrl;
                }
              }
              return img;
            });
            return { ...drip, 게시글이미지: JSON.stringify(updatedImages) };
          } catch (error) {
            console.error('이미지 파싱 오류:', error);
            return drip;
          }
        }
        return drip;
      });
      
      res.status(200).json(dripsWithImages);
    } else {
      res.status(200).json(drips);
    }
  } catch (error) {
    console.error("getUserDrip error - dripController:", error);
    res.status(500).json({ error: "getUserDrip 500error - dripController" });
  }
};

export const getPostNoDripController = async (req: Request, res: Response) => {
  try {
    const postNo = parseInt(req.params.postNo, 10);
    const userId = req.query.userId as string;
    if (isNaN(postNo)) {
      return res
        .status(400)
        .json({ error: "유효하지 않은 게시물 번호입니다." });
    }
    const drip = await dripService.getPostNoDripService(postNo, userId);
    res.status(200).json(drip);
  } catch (error) {
    console.error("getPostNoDrip error - dripController:", error);
    res.status(500).json({ error: "getPostNoDrip 500error - dripController" });
  }
};

export const postUpdateDripController = async (req: Request, res: Response) => {
  try {
    const postNo = req.params.postNo;
    const { images, tags, styleCategory, userId } = req.body;

    if (!postNo || !images || !tags || !styleCategory || !userId) {
      return res.status(400).json({ error: "필수 정보가 누락되었습니다." });
    }

    const updatedDrip = await dripService.postUpdateDripService(
      postNo,
      images,
      tags,
      styleCategory,
      userId
    );
    res.status(200).json(updatedDrip);
  } catch (error) {
    console.error("updateDrip error - dripController:", error);
    res.status(500).json({ error: "게시물 수정 중 오류가 발생했습니다." });
  }
};

export const deleteDripController = async (req: Request, res: Response) => {
  try {
    const postNo = req.params.postNo;
    const result = await dripService.deleteDripService(postNo);
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
      return res.status(400).json({ error: "user_id와 post_no가 필요합니다." });
    }
    
    const isLiked = await dripService.getDripPostLikeStatusService(userId, postNo);
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

// Drip 이미지 업로드 컨트롤러
export const uploadDripImageController = async (
  req: Request,
  res: Response
) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "이미지 파일이 필요합니다." });
    }

    console.log('📤 Drip 이미지 업로드 시작:', {
      fileSize: req.file.size,
      mimetype: req.file.mimetype,
      originalname: req.file.originalname
    });

    const fileName = `dripImage-${Date.now()}-${Math.random().toString(36).substring(2)}.jpg`;
    const result = await StorageService.uploadDripImage(req.file.buffer, fileName);

    console.log('📤 Drip 이미지 업로드 결과:', {
      success: result.success,
      url: result.url,
      error: result.error,
      fallback: result.fallback
    });

    if (result.success && result.url) {
      res.json({ 
        success: true, 
        imageUrl: result.url,
        fileName: fileName
      });
    } else {
      res.status(500).json({ 
        success: false, 
        error: result.error || "이미지 업로드에 실패했습니다." 
      });
    }
  } catch (error) {
    console.error("Drip 이미지 업로드 중 오류 발생:", error);
    res.status(500).json({ error: "이미지 업로드 중 오류가 발생했습니다." });
  }
};
