"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { useState } from "react";
import ClientLayout from "@/component/layout/ClientLayout";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ThemeProvider>
      <AuthProvider>
        <main>
          <QueryClientProvider client={queryClient}>
            <ClientLayout>{children}</ClientLayout>
          </QueryClientProvider>
        </main>
      </AuthProvider>
    </ThemeProvider>
  );
} 