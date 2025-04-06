"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Header from "@/app/header/page";
import Footer from "@/app/footer/page";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    console.log("현재 경로 pathname:", pathname); // ✅ 이거 이제 뜰 거야!
    setIsReady(true);
    document.body.style.boxSizing = "border-box";
  }, [pathname]); // ✅ pathname이 바뀔 때마다 실행됨

  if (!isReady) return null;

  const hiddenRoutes = ["/", "/login", "/join"]; // ✅ "/"는 intro 페이지
  const isHidden = hiddenRoutes.includes(pathname || "");

  return (
    <>
      {!isHidden && <Header />}
      <main>{children}</main>
      {!isHidden && <Footer />}
    </>
  );
};

export default ClientLayout;
