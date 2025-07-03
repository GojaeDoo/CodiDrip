"use client";

import { useSearchParams } from "next/navigation";
import DripUserContainer from "@/component/features/drip/dripUser/DripUser.container";

const DripUser = () => {
  const searchParams = useSearchParams();
  const gender = searchParams.get("gender") ?? "all";

  return (
    <>
      <DripUserContainer gender={gender} />
    </>
  );
};

export default DripUser;
