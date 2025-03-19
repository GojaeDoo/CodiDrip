"use client";

import { useEffect, useState } from "react";
import { fetchUsers } from "./User.query";
import HomePagePresenter from "./User.presenter";
import { User } from "./User.types";

const HomePageContainer: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  return (
    <>
      <HomePagePresenter users={users} loading={loading} />
    </>
  );
};

export default HomePageContainer;
