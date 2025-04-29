export interface ProfileEditPresenterProps {
  heightOptions: number[];
  weightOptions: number[];
  onChangeHeight: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onChangeWeight: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onChangeGender: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onChangeNickname: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeProfileImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClickCreateProfile: () => void;
  previewUrl?: string | null;
  gender: string;
}

export interface ProfileCreateParams {
  height: number;
  weight: number;
  gender: string;
  nickname: string;
  profileImage: string;
  userId: string;
}
