"use client";
import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Header from "@/app/header/page";
import Footer from "@/app/footer/page";
import { useAuth } from "@/context/AuthContext";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    console.log("현재 경로 pathname:", pathname);
    setIsReady(true);
    document.body.style.boxSizing = "border-box";

    if (isLoggedIn && (pathname === "/login" || pathname === "/join")) {
      router.push("/drips");
    }
  }, [pathname, isLoggedIn, router]);

  if (!isReady) return null;

  const hiddenRoutes = ["/", "/login", "/join"]; //
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
