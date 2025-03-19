// HomePage.presenter.tsx
import React from "react";
import { HomePagePresenterProps } from "./User.types"; // types.ts에서 HomePagePresenterProps를 가져옴

const HomePagePresenter: React.FC<HomePagePresenterProps> = ({
  users,
  loading,
}) => {
  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {users.map((user) => (
        <div key={user.user_id}>
          <h2>{user.user_email}</h2>
        </div>
      ))}
    </div>
  );
};

export default HomePagePresenter;
