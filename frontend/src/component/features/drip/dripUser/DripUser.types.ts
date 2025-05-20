export interface DripUserProps {
  gender: string;
}

export interface DripUserContainerProps {
  gender: string;
}
export interface DripUserFetchProps {
  profile_id: number;
  profile_nickname: string;
  profile_height: number;
  profile_weight: number;
  profile_image: string;
  profile_gender: string;
  profile_follow: number;
  user_id: string;
  profile_about: string;
}

export interface DripUserPresenterProps {
  users: DripUserFetchProps[];
}
