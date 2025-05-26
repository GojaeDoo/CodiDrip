import * as S from "./DripPost.styled";
import { DripPostProps } from "./DripPost.types";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  MessageCircle,
  MoreVertical,
} from "lucide-react";

export const DripPostPresenter = (props: DripPostProps) => {
  return (
    <>
      <S.Background>
        <S.UserDripPostWrapper>
          {!props.dripPostData || props.dripPostData.length === 0 ? (
            <div>게시물이 없습니다.</div>
          ) : (
            props.dripPostData.map((post) => (
              <S.PostCard
                key={`post-${post.post_no}`}
                onClick={() => props.onClickMoveDetail?.(post.post_no)}
              >
                <S.PostHeader>
                  <S.UserProfile>
                    <S.ProfileImage
                      src={`http://localhost:3005/uploads/profiles/${post.profile_image}`}
                      alt="profile"
                    />
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
                        {post.isOwner ? (
                          <>
                            <S.MenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                props.onEditPost(e, post.post_no);
                              }}
                            >
                              수정
                            </S.MenuItem>
                            <S.MenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                props.onDeletePost(e, post.post_no);
                              }}
                            >
                              삭제
                            </S.MenuItem>
                          </>
                        ) : (
                          <>
                            <S.MenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                props.onHidePost(e, post.post_no);
                              }}
                            >
                              숨김
                            </S.MenuItem>
                            <S.MenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                props.onReportPost(e, post.post_no);
                              }}
                            >
                              신고
                            </S.MenuItem>
                          </>
                        )}
                      </S.Menu>
                    )}
                  </S.MenuWrapper>
                </S.PostHeader>

                <S.ImageContainer>
                  <S.PostImage
                    src={`http://localhost:3005/uploads/drip${
                      post.post_image[post.currentImageIndex]
                    }`}
                    alt="drip post"
                  />
                  {post.post_image.length > 1 && (
                    <>
                      <S.NavigationButton
                        onClick={(e) =>
                          props.onPrevImage(
                            e,
                            post.post_no,
                            post.post_image.length
                          )
                        }
                        $position="left"
                      >
                        <ChevronLeft size={20} />
                      </S.NavigationButton>
                      <S.NavigationButton
                        onClick={(e) =>
                          props.onNextImage(
                            e,
                            post.post_no,
                            post.post_image.length
                          )
                        }
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
                  <S.ActionButton onClick={(e) => props.onLikeClick(e, post.post_no)}>
                    <Heart size={24} />
                  </S.ActionButton>
                  <S.ActionButton onClick={(e) => props.onCommentClick(e, post.post_no)}>
                    <MessageCircle size={24} />
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
    </>
  );
};

export default DripPostPresenter;