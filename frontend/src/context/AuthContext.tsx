import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import { useRouter } from "next/navigation";

interface AuthContextType {
  isLoggedIn: boolean;
  isAdmin: boolean;
  login: (token: string, userId: string, isAdmin?: boolean) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const timeoutCheckRef = useRef<NodeJS.Timeout>();
  const TIMEOUT_DURATION = 3600000;

  const startTimeoutCheck = () => {
    // 이미 실행 중인 체크를 정리
    if (timeoutCheckRef.current) {
      clearInterval(timeoutCheckRef.current);
    }

    const handleUserActivity = () => {
      localStorage.setItem("lastActivityTime", Date.now().toString());
    };

    // 활동 감지 이벤트 리스너 등록
    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keydown", handleUserActivity);
    window.addEventListener("click", handleUserActivity);
    window.addEventListener("scroll", handleUserActivity);

    // 자동 로그아웃 체크
    const checkTimeout = () => {
      const lastActivity = parseInt(
        localStorage.getItem("lastActivityTime") || "0"
      );
      const currentTime = Date.now();
      const timeDiff = currentTime - lastActivity;

      if (timeDiff > TIMEOUT_DURATION) {
        logout();
      }
    };

    // 1초마다 타임아웃 체크
    timeoutCheckRef.current = setInterval(checkTimeout, 1000);

    return () => {
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);
      window.removeEventListener("click", handleUserActivity);
      window.removeEventListener("scroll", handleUserActivity);
      if (timeoutCheckRef.current) {
        clearInterval(timeoutCheckRef.current);
      }
    };
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("lastActivityTime");
    setIsLoggedIn(false);
    setIsAdmin(false);
    if (timeoutCheckRef.current) {
      clearInterval(timeoutCheckRef.current);
    }
    window.location.href = "/login";
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const adminStatus = localStorage.getItem("isAdmin") === "true";
    
    setIsLoggedIn(!!token);
    setIsAdmin(adminStatus);

    if (token) {
      const lastActivityTime = localStorage.getItem("lastActivityTime");
      if (!lastActivityTime) {
        localStorage.setItem("lastActivityTime", Date.now().toString());
      }
      startTimeoutCheck();
    }

    return () => {
      if (timeoutCheckRef.current) {
        clearInterval(timeoutCheckRef.current);
      }
    };
  }, []);

  const login = (token: string, userId: string, isAdmin: boolean = false) => {
    
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("isAdmin", isAdmin.toString());
    localStorage.setItem("lastActivityTime", Date.now().toString());
    setIsLoggedIn(true);
    setIsAdmin(isAdmin);
    startTimeoutCheck();
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
