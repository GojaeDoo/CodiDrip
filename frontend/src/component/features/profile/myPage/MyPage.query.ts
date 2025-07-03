import axios from "axios";
import { getProfileImageUrl } from "@/utils/imageUtils";

export const getMyPageProfileQuery = async (userId: string) => {
  try {
    const response = await axios.get(
      `https://codidrip-backend.onrender.com/api/profiles/${userId}`
    );
    const profile = {
      ...response.data,
      profile_image: getProfileImageUrl(response.data.profile_image),
    };
    return profile;
  } catch (error) {
    console.log("getMyPageProfileQuery error : ", error);
  }
};

export const getDripPostDetailQuery = async (postNo: number) => {
  try {
    const response = await axios.get(
      `https://codidrip-backend.onrender.com/api/drip/${postNo}`
    );
    return response.data;
  } catch (error) {
    console.log("getDripPostDetailQuery error : ", error);
  }
};

export const getCheckFollowStatusQuery = async (followerId: string, followingId: string) => {
  try {
    const response = await axios.get(
      `https://codidrip-backend.onrender.com/api/users/follow/status?followerId=${followerId}&followingId=${followingId}`
    );
    return response.data.isFollowing;
  } catch (error) {
    console.log("checkFollowStatusQuery error : ", error);
    return false;
  }
};

export const toggleFollowQuery = async (followerId: string, followingId: string) => {
  try {
    const response = await axios.post(
      `https://codidrip-backend.onrender.com/api/users/follow/toggle`,
      { followerId, followingId }
    );
    return response.data;
  } catch (error) {
    console.log("toggleFollowQuery error : ", error);
    throw error;
  }
};

export const getUserFreeBoardPostsQuery = async (userId: string) => {
  try {
    const response = await axios.get(
      `https://codidrip-backend.onrender.com/api/freeBoard/user/${userId}`
    );
    return response.data;
  } catch (error) {
    console.log("getUserFreeBoardPostsQuery error : ", error);
    return [];
  }
};
