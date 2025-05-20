"use client";

import { useEffect, useState } from "react";
import { DripUserPresenter } from "./DripUser.presenter";
import { getDripUserFetchQuery } from "./DripUser.query";
import { DripUserContainerProps, DripUserFetchProps } from "./DripUser.types";

export const DripUserContainer = (props: DripUserContainerProps) => {
  const [users, setUsers] = useState<DripUserFetchProps[]>([]);
  const [gender, setGender] = useState("");

  useEffect(() => {
    if (props.gender != null) {
      setGender(props.gender);
    }
  }, [props.gender]);

  useEffect(() => {
    const fetchDripUser = async () => {
      try {
        const response = await getDripUserFetchQuery(
          gender !== "all" ? gender : undefined
        );
        console.log(response);
        setUsers(response);
      } catch (error) {
        console.error("Error fetching drip posts:", error);
      }
    };
    fetchDripUser();
  }, [gender]);

  return <DripUserPresenter users={users} />;
};

export default DripUserContainer;
