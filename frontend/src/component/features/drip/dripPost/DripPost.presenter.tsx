import * as S from "./DripPost.styled";
import { DripPostPresenterProps, ReportReasonType } from "./DripPost.types";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  MessageCircle,
  MoreVertical,
} from "lucide-react";
import DripPostSkeleton from "../../../commons/skeleton/drip/DripPostSkeleton";
import { useState } from "react";
import { getDripImageUrl } from "@/utils/imageUtils";

export const DripPostPresenter = (props: DripPostPresenterProps) => {
  const [reportReason, setReportReason] = useState<ReportReasonType | "">("");
  const handleReportSubmit = () => {
    if (reportReason) {
      props.onReportSubmit(reportReason as ReportReasonType);
    }
  };

  return (
    <>
      <S.Background>
        <S.UserDripPostWrapper>
          {props.isLoading ? (
            Array(5).fill(0).map((_, index) => (
              <DripPostSkeleton key={`skeleton-${index}`} />
            ))
          ) : !props.dripPostData || props.dripPostData.length === 0 ? (
            <div>게시물이 없습니다.</div>
          ) : (
            props.dripPostData.map((post) => (
              <S.PostCard
                key={`post-${post.post_no}`}
                onClick={() => props.onClickMoveDetail?.(post.post_no)}
              >
                <S.PostHeader>
                  <S.UserProfile>
                    {Array.isArray(post.profile_image) && post.profile_image.length > 0 ? (
                      post.profile_image.map((img: string, idx: number) => (
                        <S.ProfileImage
                          key={idx}
                          src={getDripImageUrl(img) || undefined}
                          alt={`drip-image-${idx}`}
                          onClick={(e) => props.onClickMoveUserProfile(e, post.post_no , post.user_id)}
                        />
                      ))
                    ) : (
                      <S.ProfileImage
                        src={getDripImageUrl(post.profile_image) || undefined}
                        alt="drip-image"
                        onClick={(e) => props.onClickMoveUserProfile(e, post.post_no , post.user_id)}
                      />
                    )}
                    <S.UserInfo>
                      <S.Username>{post.profile_nickname}</S.Username>
                      {post.profile_height && post.profile_weight && (
                        <S.UserStats>
                          {post.profile_height}cm / {post.profile_weight}kg
                        </S.UserStats>
                      )}
                    </S.UserInfo>
                  </S.UserProfile>
                  <S.MenuWrapper>
                    <S.MenuButton
                      onClick={(e) => {
                        e.stopPropagation();
                        props.onMenuClick(e, post.post_no);
                      }}
                    >
                      <MoreVertical size={20} />
                    </S.MenuButton>
                    {props.activeMenu === post.post_no && (
                      <S.Menu>
                        {post.isOwner && (
                          <S.MenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              props.onEditPost(e, post.post_no);
                            }}
                          >
                            수정
                          </S.MenuItem>
                        )}
                        {(post.isOwner || props.isAdmin) && (
                          <S.MenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              props.onDeletePost(e, post.post_no);
                            }}
                          >
                            삭제
                          </S.MenuItem>
                        )}
                        {!post.isOwner && !props.isAdmin && (
                          <S.MenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              props.onOpenReportModal(post.post_no);
                            }}
                          >
                            신고
                          </S.MenuItem>
                        )}
                      </S.Menu>
                    )}
                  </S.MenuWrapper>
                </S.PostHeader>

                <S.ImageContainer>
                  <S.PostImage
                    src={getDripImageUrl(post.post_image[post.currentImageIndex]) || "/images/profile/default-profile.png"}
                    alt="drip post"
                    onError={(e) => {
                      console.error("이미지 로드 실패:", post.post_image[post.currentImageIndex]);
                      e.currentTarget.src = "/images/profile/default-profile.png";
                    }}
                    onLoad={() => {
                      console.log("이미지 로드 성공:", post.post_image[post.currentImageIndex]);
                    }}
                  />
                  {post.post_image.length > 1 && (
                    <>
                      <S.NavigationButton
                        onClick={(e) => {
                          e.stopPropagation();
                          props.onPrevImage(
                            e,
                            post.post_no,
                            post.post_image.length
                          );
                        }}
                        $position="left"
                      >
                        <ChevronLeft size={20} />
                      </S.NavigationButton>
                      <S.NavigationButton
                        onClick={(e) => {
                          e.stopPropagation();
                          props.onNextImage(
                            e,
                            post.post_no,
                            post.post_image.length
                          );
                        }}
                        $position="right"
                      >
                        <ChevronRight size={20} />
                      </S.NavigationButton>
                      <S.ImageCounter>
                        {post.currentImageIndex + 1} / {post.post_image.length}
                      </S.ImageCounter>
                    </>
                  )}
                </S.ImageContainer>

                <S.PostActions>
                  <S.PostFooter>
                    <S.PostFooterItem>
                      <S.LikeButton 
                        $isLiked={post.liked}
                        onClick={(e) => {
                          e.stopPropagation();
                          props.onLikeClick(e, post.post_no);
                        }}
                      >
                        <Heart size={24} fill={post.liked ? "#ff3b3b" : "none"} color={post.liked ? "#ff3b3b" : "#aaa"} />
                        <span>{post["좋아요 개수"]}</span>
                      </S.LikeButton>
                    </S.PostFooterItem>
                  </S.PostFooter>
                  <S.ActionButton
                    onClick={(e) => props.onCommentClick(e, post.post_no)}
                  >
                    <MessageCircle size={24} />
                    <span>{post["댓글 개수"]}</span>
                  </S.ActionButton>
                  <div style={{ flex: 1 }} />
                </S.PostActions>

                <S.PostInfo>
                  <S.PostTags>
                    {post.post_tag.map((tag: string, index: number) => (
                      <S.Tag key={`tag-${post.post_no}-${index}`}>#{tag}</S.Tag>
                    ))}
                  </S.PostTags>
                </S.PostInfo>
              </S.PostCard>
            ))
          )}
        </S.UserDripPostWrapper>
      </S.Background>

      {/* 신고 모달 */}
      {props.showReportModal && (
        <S.ReportModalOverlay onClick={props.onCloseReportModal}>
          <S.ReportModalContent onClick={(e) => e.stopPropagation()}>
            <S.ReportModalTitle>게시글 신고</S.ReportModalTitle>
            <S.ReportModalText>
              신고 사유를 선택해주세요. 신고된 게시글은 검토 후 처리됩니다.
            </S.ReportModalText>
            <S.ReportReasonSelect
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value as ReportReasonType)}
            >
              <option value="">신고 사유를 선택하세요</option>
              <option value="욕설">욕설</option>
              <option value="광고">광고</option>
              <option value="도배">도배</option>
              <option value="부적절한 사진">부적절한 사진</option>
              <option value="기타">기타</option>
            </S.ReportReasonSelect>
            <S.ReportModalButtonGroup>
              <S.ReportModalButton onClick={props.onCloseReportModal}>
                취소
              </S.ReportModalButton>
              <S.ReportModalButton 
                $primary 
                onClick={handleReportSubmit}
                disabled={!reportReason}
              >
                신고하기
              </S.ReportModalButton>
            </S.ReportModalButtonGroup>
          </S.ReportModalContent>
        </S.ReportModalOverlay>
      )}
    </>
  );
};

export default DripPostPresenter;