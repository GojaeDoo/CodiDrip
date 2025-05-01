import * as S from "./ProfileEdit.styled";
import * as C from "../../../commons/Commons.styled";
import { ProfileEditPresenterProps } from "./ProfileEdit.types";

export const ProfileEditPresenter = (props: ProfileEditPresenterProps) => {
  return (
    <>
      <S.Background>
        <S.ProfileEditTitle>
          {props.isEditMode ? "프로필 수정" : "프로필 생성"}
        </S.ProfileEditTitle>
        <S.ProfileEditWrapper>
          <S.ProfileEditWrapperLeft>
            <S.ProfileEditImage
              src={props.previewUrl || "/images/profile/default-profile.png"}
              alt="프로필 미리보기"
            />
          </S.ProfileEditWrapperLeft>
          <S.ProfileEditWrapperRight>
            <S.ProfileEditText>닉네임</S.ProfileEditText>
            <C.Input
              placeholder="닉네임을 입력해주세요."
              onChange={props.onChangeNickname}
              value={props.nickname || ""}
            />
            <S.ProfileEditText>프로필 사진</S.ProfileEditText>
            <C.Input type="file" onChange={props.onChangeProfileImage} />
            <S.ProfileEditText>키</S.ProfileEditText>
            <S.ProfileEditSelect
              onChange={props.onChangeHeight}
              value={props.height ?? ""}
            >
              <option value="" disabled>
                키를 선택해주세요
              </option>
              {props.heightOptions.map((h) => (
                <option key={h} value={h}>
                  {h}cm
                </option>
              ))}
            </S.ProfileEditSelect>

            <S.ProfileEditText>몸무게</S.ProfileEditText>
            <S.ProfileEditSelect
              onChange={props.onChangeWeight}
              value={props.weight ?? ""}
            >
              <option value="" disabled>
                몸무게를 선택해주세요
              </option>
              {props.weightOptions.map((w) => (
                <option key={w} value={w}>
                  {w}kg
                </option>
              ))}
            </S.ProfileEditSelect>
            <S.ProfileEditText>성별</S.ProfileEditText>
            <S.ProfileEditSelect
              value={props.gender || ""}
              onChange={props.onChangeGender}
            >
              <option value="" disabled>
                성별을 선택해주세요
              </option>
              <option value="male">남자</option>
              <option value="female">여자</option>
            </S.ProfileEditSelect>
          </S.ProfileEditWrapperRight>
        </S.ProfileEditWrapper>
        <C.Button onClick={props.onClickCreateProfile}>
          {props.isEditMode ? "프로필 수정" : "프로필 생성"}
        </C.Button>
      </S.Background>
    </>
  );
};

export default ProfileEditPresenter;
