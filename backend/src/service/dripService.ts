import {
  uploadDripImage,
  createDripDB,
  getUserDripPost,
  getPostNoDripPost,
  updateDripPost,
  deleteDripPostStorage,
  getDripPostCommentStorage,
  postDripPostCommentStorage,
  getDripPostRepliesStorage,
  updateDripPostCommentStorage,
  likeDripPostCommentStorage,
  unlikeDripPostCommentStorage,
  postDripPostReplyStorage,
  likeDripPostStorage,
  unlikeDripPostStorage,
  getDripPostLikeStatusStorage,
  saveDripPostStorage,
  getDripPostSaveStatusStorage
} from "../storage/dripStorage";

export const dripService = {
  createDrip: async (images: string[], tags: string[], userId: string) => {
    try {
      const processedImages = await Promise.all(
        images.map(async (image) => {
          if (image.startsWith("data:image")) {
            const matches = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
            if (!matches || matches.length !== 3) {
              throw new Error("Invalid image format");
            }
            const contentType = matches[1];
            const base64Data = matches[2];
            const buffer = Buffer.from(base64Data, "base64");
            return await uploadDripImage(buffer, contentType);
          }
          return image;
        })
      );

      console.log("Processed images:", processedImages);

      const result = await createDripDB(processedImages, tags, userId);
      console.log("Create drip result:", result);
      return result;
    } catch (error) {
      console.error("createDrip error - dripService:", error);
      throw error;
    }
  },

  getUserDrip: async (userId?: string, filterUserId?: string, gender?: string) => {
    try {
      const drips = await getUserDripPost(userId, filterUserId, gender);
      return drips;
    } catch (error) {
      console.error("getUserDrip error - dripService:", error);
      throw error;
    }
  },

  getPostNoDrip: async (postNo: number, userId?: string) => {
    try {
      const drip = await getPostNoDripPost(postNo, userId);
      return drip;
    } catch (error) {
      console.error("getPostNoDrip error - dripService:", error);
      throw error;
    }
  },

  updateDrip: async (
    postNo: string,
    images: string[],
    tags: string[],
    userId: string
  ) => {
    try {
      // base64 이미지인 경우에만 업로드 처리
      const uploadedImages = await Promise.all(
        images.map(async (image: string) => {
          if (image.startsWith("data:")) {
            const matches = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
            if (!matches || matches.length !== 3) {
              throw new Error("Invalid image format");
            }
            const contentType = matches[1];
            const base64Data = matches[2];
            const buffer = Buffer.from(base64Data, "base64");
            return await uploadDripImage(buffer, contentType);
          }
          return image; // 이미 서버에 있는 이미지는 그대로 사용
        })
      );

      return await updateDripPost(postNo, uploadedImages, tags, userId);
    } catch (error) {
      console.error("updateDrip error - dripService:", error);
      throw error;
    }
  },

  deleteDrip: async (postNo: string) => {
    try {
      const result = await deleteDripPostStorage(Number(postNo));
      return result;
    } catch (error) {
      console.error("deleteDrip error - dripService:", error);
      throw error;
    }
  },

  getDripPostCommentService: async (postNo: number, userId?: string) => {
    try {
      const drip = await getDripPostCommentStorage(postNo, userId);
      return drip;
    } catch (error) {
      console.log(error + "getDripPostCommentService error");
    }
  },

  postDripPostCommentService: async (
    userId: string,
    postComment: string,
    postNo: string,
    parentId: string | null = null
  ) => {
    try {
      return await postDripPostCommentStorage(userId, postComment, postNo, parentId);
    } catch (error) {
      console.error("Error in postDripPostCommentService:", error);
      throw error;
    }
  },

  getDripPostReplies: async (commentId: number) => {
    return await getDripPostRepliesStorage(commentId);
  },

  updateDripPostCommentService: async (commentId: number, content: string) => {
    return await updateDripPostCommentStorage(commentId, content);
  },

  likeDripPostCommentService: async (userId: string, commentId: number) => {
    return await likeDripPostCommentStorage(userId, commentId);
  },

  unlikeDripPostCommentService: async (userId: string, commentId: number) => {
    return await unlikeDripPostCommentStorage(userId, commentId);
  },

  likeDripPostService: async (userId: string, postNo: number) => {
    try {
      const result = await likeDripPostStorage(userId, postNo);
      return result;
    } catch (error) {
      console.error('likeDripPostService error:', error);
      throw error;
    }
  },

  unlikeDripPostService: async (userId: string, postNo: number) => {
    try {
      const result = await unlikeDripPostStorage(userId, postNo);
      return result;
    } catch (error) {
      console.error('unlikeDripPostService error:', error);
      throw error;
    }
  },

  getDripPostLikeStatusService: async (userId: string, postNo: number) => {
    return await getDripPostLikeStatusStorage(userId, postNo);
  },

  saveDripPostService: async (postNo: number, userId: string) => {
    try {
      return await saveDripPostStorage(postNo, userId);
    } catch (error) {
      console.error("Error in saveDripPostService:", error);
      throw error;
    }
  },

  getDripPostSaveStatusService: async (postNo: number, userId: string) => {
    try {
      return await getDripPostSaveStatusStorage(postNo, userId);
    } catch (error) {
      console.error("Error in getDripPostSaveStatusService:", error);
      throw error;
    }
  }
};

export const getUserDripPostService = async (userId?: string) => {
  try {
    return await getUserDripPost(userId);
  } catch (error) {
    console.error("Error in getUserDripPostService:", error);
    throw error;
  }
};

export const postDripPostCommentService = async (
  userId: string,
  postComment: string,
  postNo: string
) => {
  try {
    return await postDripPostCommentStorage(userId, postComment, postNo);
  } catch (error) {
    console.error("Error in postDripPostCommentService:", error);
    throw error;
  }
};

export const postDripPostReplyService = async (
  userId: string,
  postReply: string,
  postNo: string,
  parentId: string
) => {
  try {
    return await postDripPostReplyStorage(userId, postReply, postNo, parentId);
  } catch (error) {
    console.error("Error in postDripPostReplyService:", error);
    throw error;
  }
};
