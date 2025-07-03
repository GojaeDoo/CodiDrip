"use client";

import { useSearchParams } from "next/navigation";
import { DripPostContainer } from "@/component/features/drip/dripPost/DripPost.container";

const DripPost = () => {
  const searchParams = useSearchParams();
  const gender = searchParams.get("gender") ?? "all";
  const isMyPage = searchParams.get("isMyPage") === "true";
  const userId = searchParams.get("userId") ?? "";
  const isLike = searchParams.get("isLike") === "true";
  const isSaved = searchParams.get("isSaved") === "true";
  const selectedStyles = searchParams.getAll("selectedStyles");

  return (
    <DripPostContainer
      gender={gender}
      isMyPage={isMyPage}
      userId={userId}
      isLike={isLike}
      isSaved={isSaved}
      selectedStyles={selectedStyles}
    />
  );
};

export default DripPost;
