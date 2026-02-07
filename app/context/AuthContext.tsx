"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  // Simular persistencia simple al recargar
  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuth");
    if (storedAuth === "true") setIsAuthenticated(true);
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuth", "true");
    router.push("/admin"); // Redirigir al admin al loguearse
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuth");
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
}