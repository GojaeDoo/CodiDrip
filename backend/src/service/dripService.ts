import {
  uploadDripImage,
  createDripDB,
  getUserDripPost,
  getPostNoDripPost,
  updateDripPost,
} from "../storage/dripStorage";

export const dripService = {
  createDrip: async (images: string[], tags: string[], userId: string) => {
    const uploadedImages = await Promise.all(
      images.map(async (image: string) => {
        const matches = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        if (!matches || matches.length !== 3) {
          throw new Error("Invalid image format");
        }
        const contentType = matches[1];
        const base64Data = matches[2];
        const buffer = Buffer.from(base64Data, "base64");
        return await uploadDripImage(buffer, contentType);
      })
    );
    return await createDripDB(uploadedImages, tags, userId);
  },

  getUserDrip: async (userId?: string) => {
    try {
      const drips = await getUserDripPost(userId);
      return drips;
    } catch (error) {
      console.error("getUserDrip error - dripService:", error);
      throw error;
    }
  },

  getPostNoDrip: async (postNo?: string) => {
    try {
      const drip = await getPostNoDripPost(postNo);
      return drip;
    } catch (error) {
      console.error("getPostNoDrip error - dripService:", error);
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
};

export const getUserDripPostService = async (userId?: string) => {
  try {
    return await getUserDripPost(userId);
  } catch (error) {
    console.error("Error in getUserDripPostService:", error);
    throw error;
  }
};
