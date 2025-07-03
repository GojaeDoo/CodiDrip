import axios from "axios"
import { API_ENDPOINTS } from "@/utils/apiConfig";

export const getFreeBoardTargetDataQuery = async (postId:number) => {
    const response = await axios.get(`${API_ENDPOINTS.FREEBOARD}/${postId}`);
    return response.data;
}

export const postFreeBoardWriteQuery = async (title:string , content:string , userId:string) => {
    const response = await axios.post(API_ENDPOINTS.FREEBOARD, {
        title,
        content,
        userId
    })
    return response.data;
}

export const updateFreeBoardWriteQuery = async (postId: number, title: string, content: string, userId: string) => {
    const url = `${API_ENDPOINTS.FREEBOARD}/${postId}`;
    const response = await axios.put(url, {
        title,
        content,
        userId
    });
    return response.data;
}