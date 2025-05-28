import React from "react";
import * as S from "./DripPostComment.styled";
import { MessageCircle, Send } from "lucide-react";
import { DripPostCommentContainerProps } from "./DripPostComment.types";

const DripPostComment = (props:DripPostCommentContainerProps) => {
  return (
    <S.CommentSection>
      <S.CommentInputWrapper>
        <S.CommentInput
          placeholder="댓글을 작성하세요..."
          onChange={props.onChangeComment}
        />
        <S.SubmitButton type="button" onClick={props.onSubmitComment}>
          <Send size={20} />
        </S.SubmitButton>
      </S.CommentInputWrapper>
      {/* <S.CommentList>
       
          <S.CommentItem >
            <S.CommentHeader>
              <S.UserInfo>
                <S.ProfileImage
                  
                />
                <S.UserName>
                  
                </S.UserName>
              </S.UserInfo>
              <S.CommentDate>
                
              </S.CommentDate>
            </S.CommentHeader>
            <S.CommentContent>
              
            </S.CommentContent>
            <S.CommentActions>
              <S.ReplyButton>
                <MessageCircle size={16} />
                답글
              </S.ReplyButton>
            </S.CommentActions>
            
              <S.RepliesSection>

                  <S.CommentInput
                    placeholder="답글을 작성하세요..."
                  />
                  <S.SubmitButton type="submit" >
                    <Send size={20} />
                  </S.SubmitButton>

                
                  <S.ReplyItem>
                    <S.CommentHeader>
                      <S.UserInfo>
                        <S.ProfileImage

                        />
                        <S.UserName></S.UserName>
                      </S.UserInfo>
                      <S.CommentDate>
                        
                      </S.CommentDate>
                    </S.CommentHeader>
                    <S.CommentContent></S.CommentContent>
                  </S.ReplyItem>

              </S.RepliesSection>

          </S.CommentItem>

      </S.CommentList> */}
    </S.CommentSection>
  );
};

export default DripPostComment;
