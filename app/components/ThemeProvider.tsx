"use client";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Verificar preferencia guardada o default
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  // Evitar renderizado incorrecto en el servidor (Hydration mismatch)
  if (!mounted) return <>{children}</>;

  return (
    <>
      {/* Botón movido a BOTTOM-RIGHT y con z-index 100 para estar siempre encima */}
      <div className="fixed bottom-6 right-6 z-[100]">
        <button 
           onClick={toggleTheme} 
           className="p-4 rounded-full border border-[var(--glass-border)] bg-[var(--bg-page)]/80 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.2)] hover:scale-110 hover:border-[var(--color-brand-primary)] transition-all duration-300 cursor-pointer text-[var(--text-main)] group"
           aria-label="Toggle Theme"
        >
          {theme === "dark" ? (
            <Sun className="w-6 h-6 group-hover:rotate-90 transition-transform duration-500" />
          ) : (
            <Moon className="w-6 h-6 group-hover:-rotate-12 transition-transform duration-500" />
          )}
        </button>
      </div>
      {children}
    </>
  );
}