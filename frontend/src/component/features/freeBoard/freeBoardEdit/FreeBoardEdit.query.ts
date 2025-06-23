import axios from "axios"

export const getFreeBoardTargetDataQuery = async (postId:number) => {
    const response = await axios.get(`http://localhost:3005/api/freeBoard/${postId}`);
    return response.data;
}

export const postFreeBoardWrite = async (title:string , content:string , userId:string) => {
    const response = await axios.post("http://localhost:3005/api/freeBoard" , {
        title,
        content,
        userId
    })
    return response.data;
}

export const updateFreeBoardWrite = async (postId: number, title: string, content: string, userId: string) => {
    const url = `http://localhost:3005/api/freeBoard/${postId}`;
    console.log("PUT 요청 URL:", url);
    console.log("PUT 요청 데이터:", { title, content, userId });
    
    const response = await axios.put(url, {
        title,
        content,
        userId
    });
    return response.data;
}