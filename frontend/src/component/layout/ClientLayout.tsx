"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import Header from "@/pages/header";
import Footer from "@/pages/footer";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname(); // ✅ 현재 경로 가져오기

  useEffect(() => {
    console.log(`🔥 페이지 변경됨: ${pathname}`); // ✅ 디버깅 로그

    // ✅ Next.js가 페이지 이동 후 body 스타일을 다시 적용하도록 강제
    setTimeout(() => {
      document.body.style.margin = "0";
      document.body.style.padding = "0";
      document.body.style.boxSizing = "border-box";
      document.body.style.backgroundColor = "lightblue";
    }, 100); // ✅ 페이지 이동 후 100ms 딜레이 후 적용

    return () => {
      console.log("🧹 Cleanup 실행됨"); // ✅ Cleanup 함수 확인
    };
  }, [pathname]); // ✅ pathname 변경 시 실행

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default ClientLayout;
