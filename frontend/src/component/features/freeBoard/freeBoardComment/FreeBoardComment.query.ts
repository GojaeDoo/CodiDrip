import axios from "axios"

export const postFreeBoardCommentQuery = async (newComment: string , userId: string | null , id: string | null) => {
    try {
        const response = await axios.post(`http://localhost:3005/api/freeBoard/comment`,
            {
                newComment,
                userId,
                id
            }
        )
        return response.data;
    } catch (error) {
        console.log("댓글 작성 오류 Query : " + error);
        throw error; 
    }
}

export const getFreeBoardCommentQuery = async (id: string | null) => {
    try {
        const response = await axios.get(`http://localhost:3005/api/freeBoard/comment/${id}`)
        return response.data;
    } catch (error) {
        console.log("댓글 조회 오류 Query : " + error);
        throw error;
    }
}

