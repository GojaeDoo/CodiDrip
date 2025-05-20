import axios from "axios";
import { DripPostType, DripPostResponse } from "./DripPost.types";

// 공통으로 사용되는 데이터 변환 함수
const transformDripPostData = (post: DripPostResponse): DripPostType => ({
  post_no: post.게시글번호,
  post_image: JSON.parse(post.게시글이미지 || "[]"),
  post_tag: JSON.parse(post.태그 || "[]"),
  user_id: post.user_id,
  profile_image: post.프로필이미지,
  profile_nickname: post.닉네임,
  profile_height: post.키,
  profile_weight: post.몸무게,
  isOwner: false,
  currentImageIndex: 0,
});

// 특정 사용자의 게시물을 가져오는 함수
export const getUserSpecificDripPosts = async (
  userId: string
): Promise<DripPostType[]> => {
  try {
    const response = await axios.get(
      `http://localhost:3005/api/drip?userId=${userId}`
    );
    return response.data.map(transformDripPostData);
  } catch (error) {
    console.error("사용자 게시물 조회 중 에러 발생:", error);
    throw error;
  }
};

// 모든 게시물을 가져오는 함수
export const getAllDripPosts = async (
  gender?: string
): Promise<DripPostType[]> => {
  try {
    const url = gender
      ? `http://localhost:3005/api/drip?gender=${gender}`
      : "http://localhost:3005/api/drip";
    const response = await axios.get(url);
    return response.data.map(transformDripPostData);
  } catch (error) {
    console.error("게시물 조회 중 에러 발생:", error);
    throw error;
  }
};

// 기존 함수는 새로운 함수들을 사용하도록 수정
export const getUserDripPostQuery = async (
  userId?: string,
  gender?: string
): Promise<DripPostType[]> => {
  if (userId) {
    return getUserSpecificDripPosts(userId);
  }
  return getAllDripPosts(gender);
};
