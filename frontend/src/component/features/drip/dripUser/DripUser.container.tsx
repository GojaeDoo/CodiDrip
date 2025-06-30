"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DripUserPresenter } from "./DripUser.presenter";
import { getDripUserFetchQuery } from "./DripUser.query";
import { DripUserContainerProps, DripUserFetchProps } from "./DripUser.types";
import DripUserSkeleton from "@/component/commons/skeleton/drip/DripUserSkeleton";
import { encodeUserId } from "@/utils/urlEncoder";

export const DripUserContainer = (props: DripUserContainerProps) => {
  const router = useRouter();
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

  // 사용자 카드 클릭 핸들러
  const handleUserCardClick = (userId: string) => {
    // 현재 로그인한 사용자 ID 가져오기
    const currentUserId = localStorage.getItem("userId");
    
    // 자신의 프로필인지 확인
    if (currentUserId === userId) {
      // 자신의 마이페이지로 이동
      router.push("/myPage");
    } else {
      // 다른 사용자의 프로필로 이동 (uid 인코딩)
      const encodedUserId = encodeUserId(userId);
      router.push(`/myPage?status=true&uid=${encodedUserId}`);
    }
  };

  if (isLoading) {
    return <DripUserSkeleton count={6} />;
  }

  return <DripUserPresenter users={users} onUserCardClick={handleUserCardClick} />;
};

export default DripUserContainer;
