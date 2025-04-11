import { Profile } from "@/types/profile";

export interface DripPostPresenterProps {
  profiles: Profile[];
  likedProfiles: Set<number>;
  onLike: (id: number) => void;
}
