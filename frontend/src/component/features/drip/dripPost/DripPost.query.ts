import axios from "axios";
import { DripPostType, DripPostResponse } from "./DripPost.types";

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
  "좋아요 개수": post["좋아요 개수"],
  "댓글 개수": post["댓글 개수"],
  liked: post.liked || false,
});

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

export const getAllDripPosts = async (
  gender?: string
): Promise<DripPostType[]> => {
  const userId = localStorage.getItem("userId");
  const url = gender
    ? `http://localhost:3005/api/drip?gender=${gender}&userId=${userId}`
    : `http://localhost:3005/api/drip?userId=${userId}`; 
  const response = await axios.get(url);
  return response.data.map(transformDripPostData);
};

export const getUserDripPostQuery = async (
  userId?: string,      
  gender?: string,
  isMyPage?: boolean,   
  isLike?: boolean,     
  isSaved?: boolean,
  selectedStyles?: string[]
): Promise<DripPostType[]> => {
  const loginUserId = localStorage.getItem("userId");
  let url = `http://localhost:3005/api/drip?userId=${loginUserId}`;
  if (isMyPage && userId) {
    url += `&filterUserId=${userId}`;
  }
  if (gender) {
    url += `&gender=${gender}`;
  }
  if (isLike) {
    url += `&isLike=true`;
  }
  if (isSaved) {
    url += `&isSaved=true`;
  }
  if (selectedStyles && selectedStyles.length > 0) {
    url += `&styles=${selectedStyles.join(',')}`;
  }
  const response = await axios.get(url);
  return response.data.map(transformDripPostData);
};

export const deleteDripPostQuery = async (postNo: number) => {
  try {
    const response = await axios.delete(
      `http://localhost:3005/api/drip/${postNo}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};

export const postLikeDripPostQuery = async (postId: number) => {
  try {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      throw new Error("User not logged in");
    }
    const response = await axios.post(`http://localhost:3005/api/drip/${postId}/like?userId=${userId}`);
    return {
      success: true,
      liked: response.data.liked,
      likeCount: response.data.likeCount
    };
  } catch (error) {
    console.error("Error liking post:", error);
    throw error;
  }
};

// 신고 API
export const postCreateReportQuery = async (reportData: ReportData): Promise<ReportResponse> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('로그인이 필요합니다.');
    }

    const response = await fetch(`http://localhost:3005/api/reports`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(reportData)
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || '신고 처리 중 오류가 발생했습니다.');
    }

    return data;
  } catch (error) {
    console.error('createReport error:', error);
    throw error;
  }
};

export const getReportCount = async (targetType: ReportTargetType, targetId: number): Promise<number> => {
  try {
    const response = await fetch(
      `http://localhost:3005/api/reports/count?targetType=${targetType}&targetId=${targetId}`
    );

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || '신고 개수 조회 중 오류가 발생했습니다.');
    }

    return data.count;
  } catch (error) {
    console.error('getReportCount error:', error);
    throw error;
  }
};

export const checkUserReported = async (targetType: ReportTargetType, targetId: number): Promise<boolean> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }

    const response = await fetch(
      `http://localhost:3005/api/reports/check?targetType=${targetType}&targetId=${targetId}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || '신고 확인 중 오류가 발생했습니다.');
    }

    return data.hasReported;
  } catch (error) {
    console.error('checkUserReported error:', error);
    return false;
  }
};
