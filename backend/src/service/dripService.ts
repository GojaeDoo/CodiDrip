import {
  uploadDripImage,
  createDripDB,
  getUserDripPost,
  getPostNoDripPost,
  updateDripPost,
  getDripPostCommentStorage,
  postDripPostCommentStorage,
} from "../storage/dripStorage";

export const dripService = {
  createDrip: async (
    images: string[],
    tags: string[],
    userId: string
  ) => {
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

  getUserDrip: async (userId?: string, gender?: string) => {
    try {
      const drips = await getUserDripPost(userId, gender);
      return drips;
    } catch (error) {
      console.error("getUserDrip error - dripService:", error);
      throw error;
    }
  },

  getPostNoDrip: async (postNo: number) => {
    try {
      const drip = await getPostNoDripPost(postNo);
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

  getDripPostCommentService: async (postNo: number) => {
    try {
      const drip = await getDripPostCommentStorage(postNo);
      return drip;
    } catch (error) {
      console.log(error + "getDripPostCommentService error");
    }
  },

  postDripPostCommentService: async (
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
  },
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
