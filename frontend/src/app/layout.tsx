"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "../app/globals.css";
import ClientLayout from "@/component/layout/ClientLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import Header from "@/component/layout/header/Header.presenter";
import { usePathname } from "next/navigation";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  
  // 헤더가 필요없는 페이지 경로들
  const noHeaderPaths = [
    "/login",
    "/join",
    "/idFind",
    "/idFindResult",
    "/passwordFind",
    "/passwordFindResult",
    "/passwordReset"
  ];
  const showHeader = !noHeaderPaths.includes(pathname);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {mounted && showHeader && <Header />}
          <main style={{ paddingTop: mounted && showHeader ? "100px" : "0" }}>
            <QueryClientProvider client={queryClient}>
              <ClientLayout>{children}</ClientLayout>
            </QueryClientProvider>
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
