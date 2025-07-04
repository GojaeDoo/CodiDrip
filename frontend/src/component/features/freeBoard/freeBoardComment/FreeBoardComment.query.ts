import axios from "axios"
import { API_ENDPOINTS } from "@/utils/apiConfig";

export const postFreeBoardCommentQuery = async (newComment: string , userId: string | null , id: string | null) => {
    try {
        const response = await axios.post(`${API_ENDPOINTS.FREEBOARD}/comment`,
            {
                newComment,
                userId,
                id
            }
        )
        return response.data;
    } catch (error) {
        throw error; 
    }
}

export const postFreeBoardReplyQuery = async (newComment: string, userId: string | null, postId: string | null, parentId: string) => {
    try {
        const response = await axios.post(`${API_ENDPOINTS.FREEBOARD}/comment/reply`,
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

export const getFreeBoardCommentQuery = async (postId: string | null) => {
    const response = await axios.get(`${API_ENDPOINTS.FREEBOARD}/comment/${postId}`);
    return response.data;
}

export const getFreeBoardRepliesQuery = async (commentId: string) => {
    const response = await axios.get(`${API_ENDPOINTS.FREEBOARD}/comment/${commentId}/replies`);
    return response.data;
}

export const updateFreeBoardCommentQuery = async (commentId: string, content: string, userId: string | null) => {
    const response = await axios.put(`${API_ENDPOINTS.FREEBOARD}/comment/${commentId}`, {
        content: content,
        userId: userId
    });
    return response.data;
}

export const deleteFreeBoardCommentQuery = async (commentId: string, userId: string | null) => {
    const response = await axios.delete(`${API_ENDPOINTS.FREEBOARD}/comment/${commentId}`, {
        data: { userId }
    });
    return response.data;
}

// 자유게시판 댓글 신고 기능
export const reportFreeBoardCommentQuery = async (commentId: string, reportReason: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('로그인이 필요합니다.');
    }

    const response = await axios.post(`${API_ENDPOINTS.REPORTS}/freeboard`, {
        target_type: 'comment',
        target_id: parseInt(commentId),
        report_reason: reportReason
    }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    
    return response.data;
}

