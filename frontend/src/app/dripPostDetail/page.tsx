"use client";

import { useSearchParams } from "next/navigation";

const DripPostDetailPage = () => {
  const searchParams = useSearchParams();
  const postno = searchParams.get("postNo");

  if (!postno) {
    return <div>게시글 번호가 없습니다.</div>;
  }

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Drip Post Detail</h1>
      <p>Post No: {postno}</p>
      <p>이 페이지는 현재 개발 중입니다.</p>
      <p>다른 기능들을 먼저 확인해보세요!</p>
    </div>
  );
};

export default DripPostDetailPage; 