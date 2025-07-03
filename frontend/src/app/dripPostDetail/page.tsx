"use client";

import { useSearchParams } from "next/navigation";
import DripPostDetailContainer from "../../../component/features/drip/dripPostDetail/DripPostDetail.container";

const DripPostDetailPage = () => {
  const searchParams = useSearchParams();
  const postno = searchParams.get("postNo");

  if (!postno) {
    return <div>게시글 번호가 없습니다.</div>;
  }

  return (
    <>
      <DripPostDetailContainer postno={postno} />
    </>
  );
};

export default DripPostDetailPage;
