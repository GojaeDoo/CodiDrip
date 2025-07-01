import { Profile } from "../../../layout/header/Header.types";

export interface ProfileCardPresenterProps {
  profiles: Profile[];
  likedProfiles: Set<number>;
  onLike: (id: number) => void;
}

export interface ProfileCardContainerProps {
  genderSelect: string;
}
