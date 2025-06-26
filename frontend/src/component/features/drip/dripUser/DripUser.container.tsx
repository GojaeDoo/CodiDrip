"use client";

import { useEffect, useState } from "react";
import { DripUserPresenter } from "./DripUser.presenter";
import { getDripUserFetchQuery } from "./DripUser.query";
import { DripUserContainerProps, DripUserFetchProps } from "./DripUser.types";
import DripUserSkeleton from "@/component/commons/skeleton/drip/DripUserSkeleton";

export const DripUserContainer = (props: DripUserContainerProps) => {
  const [users, setUsers] = useState<DripUserFetchProps[]>([]);
  const [gender, setGender] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (props.gender != null) {
      setGender(props.gender);
    }
  }, [props.gender]);

  useEffect(() => {
    const fetchDripUser = async () => {
      setIsLoading(true);
      try {
        const response = await getDripUserFetchQuery(
          gender !== "all" ? gender : undefined
        );
        console.log(response);
        setUsers(response);
      } catch (error) {
        console.error("Error fetching drip posts:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDripUser();
  }, [gender]);

  if (isLoading) {
    return <DripUserSkeleton count={6} />;
  }

  return <DripUserPresenter users={users} />;
};

export default DripUserContainer;
