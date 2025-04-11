"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "../app/globals.css";
import ClientLayout from "@/component/layout/ClientLayout";
import { QueryClient, QueryClientProvider } from "react-query";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// React Query 클라이언트 인스턴스 생성
const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryClientProvider client={queryClient}>
          <ClientLayout>{children}</ClientLayout>
        </QueryClientProvider>
      </body>
    </html>
  );
}
