import DripPost from "@/app/dripPost/page";
import Follow from "@/app/follow/page";
import FollowSkeleton from "@/component/commons/skeleton/follow/FollowSkeleton";
import FreeBoardSkeleton from "@/component/commons/skeleton/freeboard/FreeBoardSkeleton";
import MyPageSkeleton from "@/component/commons/skeleton/profile/MypageSkeleton";

import * as S from "./MyPage.styled";
import { MyPageProps } from "./MyPage.types";
import { Plus, Bookmark, Edit, Heart, Users, UserPlus, UserMinus, Eye } from "lucide-react";

export const MyPagePresenter = (props: MyPageProps) => {
  if (props.isMyPageLoading) {
    return <MyPageSkeleton />;
  }
  return (
    <S.Background>
      <S.MyPageWrapper>
        <S.ProfileSection>
          <S.ProfileImage
            src={
              props.userProfile?.profile_image ||
              "/images/profile/default-profile.png"
            }
            alt="프로필 이미지"
          />
          <S.ProfileBar></S.ProfileBar>
          <S.ProfileInfo>
            <S.ProfileName>
              {props.userProfile?.profile_nickname}
            </S.ProfileName>
            <S.ProfileStats>
              <S.StatItem>
                <S.StatNumber>
                  {props.userProfile?.profile_follow || 0}
                </S.StatNumber>
                <S.StatLabel>FOLLOW</S.StatLabel>
              </S.StatItem>
              <S.StatItem>
                <S.StatNumber>
                  {props.userProfile?.post_count || 0}
                </S.StatNumber>
                <S.StatLabel>MY DRIP</S.StatLabel>
              </S.StatItem>
            </S.ProfileStats>
            <S.ProfileBio>
              {props.userProfile?.profile_about || "자기소개가 없습니다."}
            </S.ProfileBio>
            <S.ProfileDetails>
              {props.userProfile?.profile_height || 0}cm / {props.userProfile?.profile_weight || 0}kg / {props.userProfile?.profile_gender || "미설정"}
            </S.ProfileDetails>
            {props.isMyPage ? (
              <S.EditButton onClick={props.onClickMoveProfileEdit}>
                <Edit size={16} />
                프로필 수정
              </S.EditButton>
            ) : (
              <S.FollowButton onClick={props.onClickFollow} $isFollowing={props.isFollowing || false}>
                {props.isFollowing ? (
                  <>
                    <UserMinus size={16} />
                    언팔로우
                  </>
                ) : (
                  <>
                    <UserPlus size={16} />
                    팔로우
                  </>
                )}
              </S.FollowButton>
            )}
          </S.ProfileInfo>
        </S.ProfileSection>

        <S.ContentSection>
          <S.TabButtons>
            <S.TabButton data-active={props.isMyDrip || false} onClick={props.onClickMoveMyDrip}>
              <Edit size={16} />
              작성한 DRIP
            </S.TabButton>
            {props.isMyPage && (
            <S.TabButton data-active={props.isLike || false} onClick={props.onClickMoveLikedDrip}>
              <Heart size={16} />
              좋아요한 DRIP
            </S.TabButton>
            )}
            {props.isMyPage && (
            <S.TabButton data-active={props.isSaved || false} onClick={props.onClickMoveSavedDrip}>
              <Bookmark size={16} />
              저장한 DRIP
            </S.TabButton>
            )}
            <S.TabButton data-active={props.isFollower || false} onClick={props.onClickMoveFollower}>
              <Users size={16} />
              팔로워
            </S.TabButton>
            <S.TabButton data-active={props.isFollowingTab || false} onClick={props.onClickMoveFollowing}>
              <Users size={16} />
              팔로잉
            </S.TabButton>
            <S.TabButton data-active={props.isMyPost || false} onClick={props.onClickMoveMyPost}>
              <Edit size={16} />
              작성한 게시글
            </S.TabButton>
          </S.TabButtons>

          <S.ContentArea>
            {props.isMyPage && (
              <S.AddButton onClick={props.onClickMoveDripPostEdit}>
                <Plus size={16} />
                DRIP 추가
              </S.AddButton>
            )}
            <S.ContentCard>
              <S.CardContent>
                {(props.isMyDrip || props.isLike || props.isSaved) && (
                  <DripPost
                    gender={props.userProfile?.profile_gender || ""}
                    isMyPage={props.isMyPage || false}
                    userId={props.userProfile?.user_id || ""}
                    isLike={props.isLike}
                    isSaved={props.isSaved}
                  />
                )}
                {(props.isFollower || props.isFollowingTab) && props.userProfile?.user_id && (
                  props.isFollowLoading ? (
                    <FollowSkeleton count={6} />
                  ) : (
                    <Follow 
                      initialTab={props.activeFollowTab} 
                      targetUserId={props.userProfile.user_id}
                    />
                  )
                )}
                {props.isMyPost && (
                  props.isFreeBoardLoading ? (
                    <FreeBoardSkeleton count={6} />
                  ) : (
                    <S.FreeBoardPostsContainer>
                      {props.freeBoardPosts.length === 0 ? (
                        <S.NoPostsMessage>
                          작성한 자유게시판 게시글이 없습니다.
                        </S.NoPostsMessage>
                      ) : (
                        props.freeBoardPosts.map((post) => (
                          <S.FreeBoardPostItem key={post.id} onClick={() => props.onClickFreeBoardPost(post.id)}>
                            <S.PostTitle>{post.title}</S.PostTitle>
                            <S.PostContent>{post.content.length > 100 ? `${post.content.substring(0, 100)}...` : post.content}</S.PostContent>
                            <S.PostMeta>
                              <S.PostDate>{props.formatDate(post.createdAt)}</S.PostDate>
                              <S.PostViews>
                                <Eye size={14} />
                                {post.viewCount}
                              </S.PostViews>
                            </S.PostMeta>
                          </S.FreeBoardPostItem>
                        ))
                      )}
                    </S.FreeBoardPostsContainer>
                  )
                )}
              </S.CardContent>
            </S.ContentCard>
          </S.ContentArea>
        </S.ContentSection>
      </S.MyPageWrapper>
    </S.Background>
  );
};

export default MyPagePresenter;
