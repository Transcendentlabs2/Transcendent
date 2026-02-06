"use client";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Inicializamos estado sin valor para evitar errores de hidratación
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    // 1. Leer preferencia guardada
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    
    // 2. Aplicar la configuración inicial (CLASE + ATRIBUTO)
    const root = document.documentElement;
    root.setAttribute("data-theme", savedTheme);
    
    if (savedTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (!theme) return;

    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    // 3. Aplicar el cambio al DOM (CLASE + ATRIBUTO)
    const root = document.documentElement;
    root.setAttribute("data-theme", newTheme); // Para tus variables CSS
    
    if (newTheme === "dark") {
      root.classList.add("dark"); // Para que Tailwind sepa que es modo oscuro
    } else {
      root.classList.remove("dark"); // Para que Tailwind sepa que es modo claro
    }
  };

  // Evitar renderizado hasta que esté montado
  if (!theme) return <>{children}</>;

  return (
    <>
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