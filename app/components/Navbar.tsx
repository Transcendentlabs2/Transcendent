"use client";

import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, Search, FlaskConical } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled
          ? "bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-xl border-slate-200 dark:border-white/10 py-3"
          : "bg-transparent py-5 border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        
        {/* --- LEFT: BRAND IDENTITY --- */}
        <div className="flex items-center gap-4">
            {/* Logo Image */}
            <a 
                href="#"
                onClick={(e) => handleScrollTo(e, "#hero")}
                className="relative w-10 h-10 md:w-11 md:h-11 shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
            >
                <Image 
                    src={logo} 
                    alt="Logo" 
                    fill 
                    className="object-contain"
                    priority
                />
            </a>

            {/* Separator Line (Visible on Desktop) */}
            <div className="hidden md:block h-8 w-[1px] bg-slate-200 dark:bg-white/10" />

            {/* Brand Name Structure */}
            <div className="flex flex-col md:flex-row md:items-baseline gap-0 md:gap-3">
                <span className="font-display font-bold text-lg tracking-tight text-slate-900 dark:text-white">
                    TRANSCENDENT
                </span>
                
                {/* SOLUCIÓN CRÍTICA:
                   En lugar de un subtítulo verde claro ilegible, usamos un "Tag" estilizado.
                   - Light Mode: Fondo gris muy suave, texto oscuro (Legibilidad 100%)
                   - Dark Mode: Fondo verde oscuro translúcido, texto verde neón.
                */}
                <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-emerald-500/10 px-2 py-0.5 rounded-md border border-slate-200 dark:border-emerald-500/20 w-fit">
                    <FlaskConical className="w-3 h-3 text-slate-500 dark:text-emerald-400" />
                    <span className="font-mono text-[10px] uppercase font-bold text-slate-600 dark:text-emerald-400 tracking-wider">
                        Labs & Research
                    </span>
                </div>
            </div>
        </div>

        {/* --- CENTER: NAVIGATION (Desktop) --- */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-50 dark:bg-white/5 p-1 rounded-full border border-slate-200 dark:border-white/5">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-wide text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white hover:shadow-sm transition-all duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* --- RIGHT: ACTIONS --- */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2">
             <button className="p-2.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 rounded-full transition-colors">
                <Search className="w-5 h-5" />
             </button>
             <button className="relative p-2.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 rounded-full transition-colors group">
                <ShoppingCart className="w-5 h-5 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full border-2 border-white dark:border-[#0a0a0a]"></span>
             </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-slate-900 dark:text-white"
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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 right-0 border-b border-slate-200 dark:border-white/10 bg-white dark:bg-[#0a0a0a] shadow-2xl"
          >
            <div className="p-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="flex items-center justify-between text-lg font-bold text-slate-800 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 py-2 border-b border-slate-100 dark:border-white/5 last:border-0"
                  onClick={(e) => handleScrollTo(e, link.href)}
                >
                  {link.name}
                </a>
              ))}
              <div className="flex gap-4 pt-4 mt-2">
                 <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white font-bold text-sm">
                    <Search className="w-4 h-4" /> Search
                 </button>
                 <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-emerald-600 text-white font-bold text-sm shadow-lg shadow-emerald-500/20">
                    <ShoppingCart className="w-4 h-4" /> Cart (0)
                 </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}