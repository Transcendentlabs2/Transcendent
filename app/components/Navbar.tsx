"use client";

import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image"; // <--- IMPORTANTE: Importamos el componente Image

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
    { name: "Peptide Science", href: "#science" },
    { name: "Testing", href: "#testing" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled
          ? "bg-white/80 dark:bg-[var(--bg-page)]/80 backdrop-blur-md border-slate-200 dark:border-[var(--glass-border)] py-3 shadow-sm"
          : "bg-transparent py-6 border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* --- LOGO AREA --- */}
        <a 
          href="#"
          onClick={(e) => handleScrollTo(e, "#hero")}
          className="flex items-center gap-3 group cursor-pointer"
        >
          {/* Contenedor del Logo Imagen */}
          <div className="relative w-10 h-10 md:w-12 md:h-12 overflow-hidden transition-transform group-hover:scale-105">
            {/* Asegúrate de que tu logo esté en /public/img/logo.png o cambia la ruta aquí */}
            <Image 
                src="/img/logo.web" 
                alt="Transcendent Labs Logo" 
                fill 
                className="object-contain"
                priority
            />
          </div>

          {/* Texto del Logo */}
          <div className="flex flex-col">
            {/* Título Principal: Negro en Light, Blanco en Dark */}
            <span className="font-display font-bold text-lg md:text-xl leading-none tracking-wide text-slate-900 dark:text-[var(--text-main)]">
              TRANSCENDENT
            </span>
            
            {/* Subtítulo: Gris oscuro en Light (para que se lea), Verde Neón en Dark */}
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase mt-1 font-bold text-slate-600 dark:text-[var(--color-brand-secondary)]">
              Labs & Research
            </span>
          </div>
        </a>

        {/* --- DESKTOP NAVIGATION --- */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              // Links: Gris oscuro en light, gris claro en dark. Hover siempre el color primario.
              className="text-xs font-bold uppercase tracking-widest text-slate-600 dark:text-[var(--text-muted)] hover:text-[var(--color-brand-primary)] dark:hover:text-[var(--color-brand-primary)] transition-colors relative group cursor-pointer"
            >
              {link.name}
              <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-[var(--color-brand-primary)] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* --- ACTIONS --- */}
        <div className="hidden md:flex items-center gap-4">
          <button className="p-2 text-slate-700 dark:text-[var(--text-main)] hover:bg-slate-100 dark:hover:bg-[var(--glass-border)] rounded-full transition-colors cursor-pointer">
            <Search className="w-5 h-5" />
          </button>
          
          <button className="relative p-2 text-slate-700 dark:text-[var(--text-main)] hover:bg-slate-100 dark:hover:bg-[var(--glass-border)] rounded-full transition-colors group cursor-pointer">
            <ShoppingCart className="w-5 h-5 group-hover:text-[var(--color-brand-primary)] transition-colors" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 dark:bg-[var(--color-brand-secondary)] rounded-full animate-pulse"></span>
          </button>
        </div>

        {/* --- MOBILE TOGGLE --- */}
        <button
          className="md:hidden text-slate-900 dark:text-[var(--text-main)]"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* --- MOBILE MENU OVERLAY --- */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-slate-200 dark:border-[var(--glass-border)] bg-white dark:bg-[var(--bg-page)] overflow-hidden shadow-xl"
          >
            <div className="p-6 flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-lg font-display font-bold text-slate-800 dark:text-[var(--text-main)] hover:text-[var(--color-brand-primary)] cursor-pointer"
                  onClick={(e) => handleScrollTo(e, link.href)}
                >
                  {link.name}
                </a>
              ))}
              
              {/* Iconos móviles extra */}
              <div className="flex gap-4 mt-4 border-t border-slate-100 dark:border-white/10 pt-6">
                 <button className="flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-400">
                    <Search className="w-4 h-4" /> Search
                 </button>
                 <button className="flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-400">
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