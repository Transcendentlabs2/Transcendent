"use client";

import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
// Verifica que la ruta de tu logo sea correcta
import logo from "../assets/logo.webp"; 

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      setMobileOpen(false);
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { name: "Catalog", href: "#catalog" },
    { name: "Verify Batch", href: "#verification" },
    { name: "Calculator", href: "#calculator" },
    { name: "Science", href: "#science" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          // AQUÍ LA MAGIA: Usamos tus variables globales con opacidad para el efecto glass
          ? "bg-[var(--bg-page)]/90 backdrop-blur-md border-b border-[var(--glass-border)] py-3 shadow-sm"
          : "bg-transparent border-b border-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* --- LEFT: BRANDING --- */}
        <div className="flex items-center gap-4">
            <a 
                href="#"
                onClick={(e) => handleScrollTo(e, "#hero")}
                className="relative w-10 h-10 md:w-11 md:h-11 shrink-0 cursor-pointer hover:scale-105 transition-transform"
            >
                <Image 
                    src={logo} 
                    alt="Logo" 
                    fill 
                    className="object-contain"
                    priority
                />
            </a>

            {/* Separador vertical: Se adapta usando tus variables de texto */}
            <div className={`hidden md:block h-8 w-[1px] bg-[var(--text-muted)] opacity-20`} />

            <div className="flex flex-col justify-center">
                {/* TÍTULO: Usa var(--text-main) para coincidir con tu CSS global */}
                <span className="font-display font-black text-lg md:text-xl leading-none tracking-tight text-[var(--text-main)] mb-1.5 transition-colors">
                    TRANSCENDENT
                </span>
                
                {/* BADGE (CÁPSULA) - Mantenemos el fix de legibilidad
                    - Light Mode: bg-black (Negro puro)
                    - Dark Mode: bg-emerald-500/10 (Verde translúcido)
                    Esto es independiente del CSS global para asegurar contraste.
                */}
                <div className="flex items-center justify-center px-3 py-0.5 rounded-full bg-black dark:bg-emerald-500/10 border border-transparent dark:border-emerald-500/20 w-fit shadow-sm">
                    <span className="font-mono text-[9px] md:text-[10px] uppercase font-bold text-[#4ADE80] tracking-[0.15em] leading-none">
                        Labs & Research
                    </span>
                </div>
            </div>
        </div>

        {/* --- CENTER: NAVIGATION --- */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              // Usamos var(--text-muted) y var(--text-main) de tu CSS
              className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors py-2 relative group cursor-pointer"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[var(--color-brand-primary)] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* --- RIGHT: ICONS --- */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2">
             <button className="p-2 text-[var(--text-main)] hover:bg-[var(--text-muted)]/10 rounded-full transition-colors cursor-pointer">
                <Search className="w-5 h-5" />
             </button>
             
             <button className="relative p-2 text-[var(--text-main)] hover:bg-[var(--text-muted)]/10 rounded-full transition-colors group cursor-pointer">
                <ShoppingCart className="w-5 h-5 group-hover:text-[var(--color-brand-primary)] transition-colors" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 dark:bg-[var(--color-brand-secondary)] rounded-full border-2 border-[var(--bg-page)]"></span>
             </button>
          </div>

          <button
            className="lg:hidden p-2 text-[var(--text-main)]"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* --- MOBILE MENU --- */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            // Fondo sólido usando tu variable de página para máxima legibilidad
            className="lg:hidden absolute top-[100%] left-0 right-0 bg-[var(--bg-page)]/95 backdrop-blur-xl border-b border-[var(--glass-border)] shadow-2xl"
          >
            <div className="p-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-lg font-bold text-[var(--text-main)] py-3 border-b border-[var(--glass-border)] last:border-0"
                  onClick={(e) => handleScrollTo(e, link.href)}
                >
                  {link.name}
                </a>
              ))}
              
              {/* Mobile Actions */}
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-[var(--glass-border)]">
                 <button className="flex-1 py-3 flex items-center justify-center gap-2 bg-[var(--text-muted)]/10 rounded-lg text-[var(--text-main)] font-bold text-sm">
                    <Search className="w-4 h-4" /> Search
                 </button>
                 <button className="flex-1 py-3 flex items-center justify-center gap-2 bg-[var(--text-main)] text-[var(--bg-page)] rounded-lg font-bold text-sm">
                    <ShoppingCart className="w-4 h-4" /> Cart
                 </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}