import DripPost from "@/app/dripPost/page";

import * as S from "./MyPage.styled";
import { MyPageProps } from "./MyPage.types";
import { Plus, Bookmark, Tag, LogOut, Edit, Heart, Users } from "lucide-react";

export const MyPagePresenter = (props: MyPageProps) => {
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
            <S.EditButton onClick={props.onClickMoveProfileEdit}>
              <Edit size={16} />
              프로필 수정
            </S.EditButton>
          </S.ProfileInfo>
        </S.ProfileSection>

        <S.ContentSection>
          <S.TabButtons>
            <S.TabButton data-active={props.isMyDrip} onClick={props.onClickMoveMyDrip}>
              <Edit size={16} />
              내가 작성한 DRIP
            </S.TabButton>
            <S.TabButton data-active={props.isLike} onClick={props.onClickMoveLikedDrip}>
              <Heart size={16} />
              좋아요한 DRIP
            </S.TabButton>
            <S.TabButton data-active={props.isSaved} onClick={props.onClickMoveSavedDrip}>
              <Bookmark size={16} />
              저장한 DRIP
            </S.TabButton>
            <S.TabButton data-active={props.isFollower} onClick={props.onClickMoveFollower}>
              <Users size={16} />
              팔로워
            </S.TabButton>
            <S.TabButton data-active={props.isFollowing} onClick={props.onClickMoveFollowing}>
              <Users size={16} />
              팔로잉
            </S.TabButton>
          </S.TabButtons>

          <S.ContentArea>
            <S.AddButton onClick={props.onClickMoveDripPostEdit}>
              <Plus size={16} />
              DRIP 추가
            </S.AddButton>
            <S.ContentCard>
              <S.CardContent>
                <DripPost
                  gender={props.userProfile?.profile_gender || ""}
                  isMyPage={true}
                  userId={props.userProfile?.user_id || ""}
                  isLike={props.isLike}
                  isSaved={props.isSaved}
                />
              </S.CardContent>
            </S.ContentCard>
          </S.ContentArea>
        </S.ContentSection>
      </S.MyPageWrapper>
    </S.Background>
  );
};

export default MyPagePresenter;
