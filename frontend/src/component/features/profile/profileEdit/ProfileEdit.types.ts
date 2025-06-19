export interface ProfileEditPresenterProps {
  heightOptions: number[];
  weightOptions: number[];
  onChangeHeight: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onChangeWeight: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  gender: string;
  onChangeGender: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onChangeNickname: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeProfileImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeProfileAbout: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onClickNicknameCheck: () => void;
  onClickCreateProfile: () => void;
  previewUrl: string | null;
  isEditMode: boolean;
  height: number | null;
  weight: number | null;
  nickname: string;
  profileAbout: string;
  isNicknameChecked: boolean;
}

export interface ProfileCreateParams {
  height: number;
  weight: number;
  gender: string;
  nickname: string;
  profileImage: string;
  userId: string;
  profileAbout: string;
}

export interface ProfileData {
  userId: string;
  height: number;
  weight: number;
  gender: string;
  nickname: string;
  profileImage: string;
}