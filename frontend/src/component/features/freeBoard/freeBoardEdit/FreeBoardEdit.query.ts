import axios from "axios"

export const getFreeBoardTargetDataQuery = async (postId:number) => {
    const response = await axios.get(`http://localhost:3005/api/freeBoard/${postId}`);
    return response.data;
}

export const postFreeBoardWriteQuery = async (title:string , content:string , userId:string) => {
    const response = await axios.post("http://localhost:3005/api/freeBoard" , {
        title,
        content,
        userId
    })
    return response.data;
}

export const updateFreeBoardWriteQuery = async (postId: number, title: string, content: string, userId: string) => {
    const url = `http://localhost:3005/api/freeBoard/${postId}`;
    const response = await axios.put(url, {
        title,
        content,
        userId
    });
    return response.data;
}