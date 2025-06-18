import axios from "axios";

export const getMyPageProfileQuery = async (userId: string) => {
  try {
    const response = await axios.get(
      `http://localhost:3005/api/profiles/${userId}`
    );
    const profile = {
      ...response.data,
      profile_image: response.data.profile_image
        ? `http://localhost:3005/uploads/profiles/${response.data.profile_image}`
        : null,
    };
    return profile;
  } catch (error) {
    console.log("getMyPageProfileQuery error : ", error);
  }
};

export const getDripPostDetailQuery = async (postNo: number) => {
  try {
    const response = await axios.get(
      `http://localhost:3005/api/drip/${postNo}`
    );
    return response.data;
  } catch (error) {
    console.log("getDripPostDetailQuery error : ", error);
  }
};

export const checkFollowStatusQuery = async (followerId: string, followingId: string) => {
  try {
    const response = await axios.get(
      `http://localhost:3005/api/users/follow/status?followerId=${followerId}&followingId=${followingId}`
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
      `http://localhost:3005/api/users/follow/toggle`,
      { followerId, followingId }
    );
    return response.data;
  } catch (error) {
    console.log("toggleFollowQuery error : ", error);
    throw error;
  }
};
