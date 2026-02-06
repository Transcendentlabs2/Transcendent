"use client";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Inicializamos estado sin valor para evitar errores de hidratación
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    // CAMBIO AQUÍ: Si no hay nada guardado, usa "light" en vez de "dark"
    const savedTheme = localStorage.getItem("theme") || "light"; 
    
    setTheme(savedTheme);
    
    // Aplicar la configuración inicial
    const root = document.documentElement;
    root.setAttribute("data-theme", savedTheme);
    
    if (savedTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    // Si todavía no se ha cargado el tema (null), no hagas nada
    if (!theme) return;

    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    // Aplicar el cambio al DOM
    const root = document.documentElement;
    root.setAttribute("data-theme", newTheme);
    
    if (newTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  // Evitar renderizado hasta que esté montado para prevenir Flash of Unstyled Content
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