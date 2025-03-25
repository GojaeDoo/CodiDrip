import React from "react";
import { HomePagePresenterProps } from "./User.types";

const HomePagePresenter = ({ users, loading }: HomePagePresenterProps) => {
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
