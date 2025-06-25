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

export const postFreeBoardReplyQuery = async (newComment: string, userId: string | null, postId: string | null, parentId: string) => {
    try {
        const response = await axios.post(`http://localhost:3005/api/freeBoard/comment/reply`,
            {
                newComment,
                userId,
                postId,
                parentId
            }
        )
        return response.data;
    } catch (error) {
        console.log("대댓글 작성 오류 Query : " + error);
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

export const getFreeBoardRepliesQuery = async (commentId: string) => {
    try {
        const response = await axios.get(`http://localhost:3005/api/freeBoard/comment/${commentId}/replies`)
        return response.data;
    } catch (error) {
        console.log("대댓글 조회 오류 Query : " + error);
        throw error;
    }
}

export const updateFreeBoardCommentQuery = async (commentId: string, content: string, userId: string | null) => {
    try {
        const response = await axios.put(`http://localhost:3005/api/freeBoard/comment/${commentId}`, {
            content,
            userId
        });
        return response.data;
    } catch (error) {
        console.log("댓글 수정 오류 Query : " + error);
        throw error;
    }
}

export const deleteFreeBoardCommentQuery = async (commentId: string, userId: string | null) => {
    try {
        const response = await axios.delete(`http://localhost:3005/api/freeBoard/comment/${commentId}`, {
            data: { userId }
        });
        return response.data;
    } catch (error) {
        console.log("댓글 삭제 오류 Query : " + error);
        throw error;
    }
}

