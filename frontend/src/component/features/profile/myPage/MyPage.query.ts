import axios from "axios";
import { getProfileImageUrl } from "@/utils/imageUtils";
import { API_ENDPOINTS } from "@/utils/apiConfig";

export const getMyPageProfileQuery = async (userId: string) => {
  try {
    const response = await axios.get(
      `${API_ENDPOINTS.PROFILES}/${userId}`
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
      `${API_ENDPOINTS.DRIP}/${postNo}`
    );
    return response.data;
  } catch (error) {
    console.log("getDripPostDetailQuery error : ", error);
  }
};

export const getCheckFollowStatusQuery = async (followerId: string, followingId: string) => {
  try {
    const response = await axios.get(
      `${API_ENDPOINTS.JOIN}/follow/status?followerId=${followerId}&followingId=${followingId}`
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
      `${API_ENDPOINTS.JOIN}/follow/toggle`,
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
      `${API_ENDPOINTS.FREEBOARD}/user/${userId}`
    );
    return response.data;
  } catch (error) {
    console.log("getUserFreeBoardPostsQuery error : ", error);
    return [];
  }
};
