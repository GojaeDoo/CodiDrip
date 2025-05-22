"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "../app/globals.css";
import ClientLayout from "@/component/layout/ClientLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/context/AuthContext";
import { useState } from "react";

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

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <ClientLayout>{children}</ClientLayout>
          </QueryClientProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
