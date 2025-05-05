import * as S from "./MyPage.styled";
import { MyPageProps } from "./MyPage.types";
import { Plus, Bookmark, Tag, LogOut, Edit } from "lucide-react";

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
                <S.StatItem>
                  <S.StatNumber>37</S.StatNumber>
                  <S.StatLabel>좋아요</S.StatLabel>
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
              <S.SidebarItem>
                <Bookmark size={16} />
                저장한 DRIP
              </S.SidebarItem>
              <S.SidebarItem>
                <Tag size={16} />
                태그 관리
              </S.SidebarItem>
              <S.SidebarItem>
                <LogOut size={16} />
                로그아웃
              </S.SidebarItem>
            </S.Sidebar>

            <S.MainContent>
              <S.ContentCard>
                <S.CardHeader>
                  <S.CardTitle>내 DRIP</S.CardTitle>
                </S.CardHeader>
                <S.CardContent>여기에 DRIP 목록이 표시됩니다.</S.CardContent>
              </S.ContentCard>

              <S.ContentCard>
                <S.CardHeader>
                  <S.CardTitle>좋아요한 DRIP</S.CardTitle>
                </S.CardHeader>
                <S.CardContent>
                  여기에 좋아요한 DRIP 목록이 표시됩니다.
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
