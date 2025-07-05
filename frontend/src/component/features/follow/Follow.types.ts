export interface Profile {
  profile_id: number;
  profile_nickname: string;
  profile_height: number;
  profile_weight: number;
  profile_image: string | null;
  profile_gender: string;
  profile_follow: number;
  user_id: string;
  profile_about: string | null;
}

export interface FollowPresenterProps {
  currentList: Profile[];
  listTitle: string;
  activeTab: 'followers' | 'following';
  onTabChange: (tab: 'followers' | 'following') => void;
}

export interface FollowPageProps {
  initialTab?: 'followers' | 'following';
  targetUserId?: string;
}
