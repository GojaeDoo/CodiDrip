import { useEffect, useState } from "react";
import DripPostComment from "./DripPostComment.presenter";
import { DripPostCommentContainerProps, DripPostCommentProps } from "./DripPostComment.types";
import { postCommentQuery } from "./DripPostComment.query";

export const DripPostCommentContainer = (props:DripPostCommentProps) => {
  const [postno , setPostno] = useState<number>();
  const [commentContent, setCommentContent] = useState("");
  const [user_id, setUserId] = useState<string>();

  useEffect(()=>{
    setPostno(props.postno);
    const user_id = localStorage.getItem("userId");
    if(user_id){
      setUserId(user_id);
    }
  },[])

  const onChangeComment: DripPostCommentContainerProps["onChangeComment"] = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentContent(e.target.value);
    console.log("입력값:", e.target.value);
  };

  const onSubmitComment: DripPostCommentContainerProps["onSubmitComment"] = async () => {
    console.log(commentContent);
    console.log(user_id);
    console.log(postno);

    const response = await postCommentQuery(postno, user_id , commentContent);
    console.log(response);
    
  }

  return (
    <DripPostComment
      onChangeComment={onChangeComment}
      onSubmitComment={onSubmitComment}
    />
  );
};

export default DripPostCommentContainer;
