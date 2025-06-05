import DripPost from "@/app/dripPost/page";

import * as S from "./MyPage.styled";
import { MyPageProps } from "./MyPage.types";
import { Plus, Bookmark, Tag, LogOut, Edit, Heart } from "lucide-react";

export const MyPagePresenter = (props: MyPageProps) => {
  return (
    <>
      <S.Background>
        <S.MyPageWrapper>
          <S.ProfileHeader>
            <S.ProfileImage
              src={
                props.userProfile?.profile_image ||
                "/images/profile/default-profile.png"
              }
              alt="프로필 이미지"
            />
            <S.ProfileInfo>
              <S.ProfileName>
                {props.userProfile?.profile_nickname}
              </S.ProfileName>
              <S.ProfileBio>
                안녕하세요! {props.userProfile?.profile_nickname}입니다.
              </S.ProfileBio>
              <S.ProfileStats>
                <S.StatItem>
                  <S.StatNumber>
                    {props.userProfile?.profile_follow || 0}
                  </S.StatNumber>
                  <S.StatLabel>팔로워</S.StatLabel>
                </S.StatItem>
                <S.StatItem>
                  <S.StatNumber>5</S.StatNumber>
                  <S.StatLabel>MY DRIP</S.StatLabel>
                </S.StatItem>

              </S.ProfileStats>
              <S.EditButton onClick={props.onClickMoveProfileEdit}>
                <Edit size={16} />
                프로필 수정
              </S.EditButton>
            </S.ProfileInfo>
          </S.ProfileHeader>

          <S.ContentSection>
            <S.Sidebar>
              <S.SidebarItem onClick={props.onClickMoveDripPostEdit}>
                <Plus size={16} />
                DRIP 추가
              </S.SidebarItem>
              <S.SidebarItem onClick={props.onClickMoveMyDrip}>
                <Edit size={16} />
                내가 작성한 DRIP
              </S.SidebarItem>
              <S.SidebarItem onClick={props.onClickMoveLikedDrip}>
                <Heart size={16} />
                좋아요한 DRIP
              </S.SidebarItem>
              <S.SidebarItem onClick={props.onClickMoveSavedDrip}>
                <Bookmark size={16} />
                저장한 DRIP
              </S.SidebarItem>
              <S.SidebarItem>
                <LogOut size={16} />
                로그아웃
              </S.SidebarItem>
            </S.Sidebar>

            <S.MainContent>
              <S.ContentCard>
                <S.CardContent>
                  <DripPost
                    gender={props.userProfile?.profile_gender || ""}
                    isMyPage={true}
                    userId={props.userProfile?.user_id || ""}
                  />
                </S.CardContent>
              </S.ContentCard>
            </S.MainContent>
          </S.ContentSection>
        </S.MyPageWrapper>
      </S.Background>
    </>
  );
};

export default MyPagePresenter;
