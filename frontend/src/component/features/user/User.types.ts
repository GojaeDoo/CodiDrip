export interface User {
  user_id: string;
  user_password: string;
  user_email: string;
}

export interface HomePagePresenterProps {
  users: User[];
  loading: boolean;
}
