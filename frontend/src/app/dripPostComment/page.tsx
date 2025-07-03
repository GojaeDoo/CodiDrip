"use client";

import { useSearchParams } from "next/navigation";
import DripPostCommentContainer from "@/component/features/drip/dripPostComment/DripPostComment.container";

const DripPostComment = () => {
  const searchParams = useSearchParams();
  const postno = parseInt(searchParams.get("postno") || "0", 10);

  return (
    <>
      <DripPostCommentContainer postno={postno} />
    </>
  );
};

export default DripPostComment;
