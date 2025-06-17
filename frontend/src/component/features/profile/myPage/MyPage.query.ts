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