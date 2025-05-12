import { DripPostType } from "./DripPost.types";

export const getUserDripPostQuery = async (
  userId?: string
): Promise<DripPostType[]> => {
  try {
    const response = await fetch(
      `http://localhost:3005/api/drip${userId ? `?userId=${userId}` : ""}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch drip posts");
    }
    const data = await response.json();

    // 데이터 변환
    return data.map((post: any) => ({
      post_no: post.게시글번호,
      post_image: JSON.parse(post.게시글이미지 || "[]"),
      post_tag: JSON.parse(post.태그 || "[]"),
      user_id: post.user_id,
      profile_image: post.프로필이미지,
      profile_nickname: post.닉네임,
      profile_height: post.키,
      profile_weight: post.몸무게,
    }));
  } catch (error) {
    console.error("Error fetching drip posts:", error);
    throw error;
  }
};
