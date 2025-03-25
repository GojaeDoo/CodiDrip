"use client";
import React, { useState, useEffect } from "react";
import Header from "@/pages/header";
import Footer from "@/pages/footer";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
    document.body.style.boxSizing = "border-box";
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default ClientLayout;
