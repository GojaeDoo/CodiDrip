import axios from "axios"

export const postCommentQuery = async (postno: number, user_id: string, commentContent: string) => {
  const response = await axios.post(`http://localhost:3005/api/drip/${postno}/comments`,{
    post_id: postno,
    user_id: user_id,
    content: commentContent,
    parent_id: null,
  })
  return response.data;
}