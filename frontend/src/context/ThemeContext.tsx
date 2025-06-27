import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    
    if (theme === "dark") {
      root.style.setProperty("--background", "#1a1a1a");
      root.style.setProperty("--foreground", "#ffffff");
      root.style.setProperty("--card-bg", "#232323");
      root.style.setProperty("--card-border", "#333333");
      root.style.setProperty("--text-primary", "#ffffff");
      root.style.setProperty("--text-secondary", "#b0b3b8");
      root.style.setProperty("--text-muted", "#6b7280");
      root.style.setProperty("--accent", "#2563eb");
      root.style.setProperty("--accent-hover", "#1d4ed8");
      root.style.setProperty("--danger", "#ef4444");
      root.style.setProperty("--success", "#10b981");
      root.style.setProperty("--warning", "#f59e0b");
    } else {
      root.style.setProperty("--background", "#ffffff");
      root.style.setProperty("--foreground", "#171717");
      root.style.setProperty("--card-bg", "#f8fafc");
      root.style.setProperty("--card-border", "#e2e8f0");
      root.style.setProperty("--text-primary", "#171717");
      root.style.setProperty("--text-secondary", "#64748b");
      root.style.setProperty("--text-muted", "#94a3b8");
      root.style.setProperty("--accent", "#2563eb");
      root.style.setProperty("--accent-hover", "#1d4ed8");
      root.style.setProperty("--danger", "#ef4444");
      root.style.setProperty("--success", "#10b981");
      root.style.setProperty("--warning", "#f59e0b");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}; 