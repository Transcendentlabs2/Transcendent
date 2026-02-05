"use client";
import { useEffect, useState } from "react";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === "dark" ? "light" : "dark");

  return (
    <>
      <div className="fixed top-6 right-6 z-50">
        <button 
           onClick={toggleTheme} 
           className="p-2 rounded-full border border-[var(--glass-border)] bg-[var(--bg-page)]/50 backdrop-blur-md hover:scale-110 transition-all cursor-pointer shadow-lg"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
      </div>
      {children}
    </>
  );
}