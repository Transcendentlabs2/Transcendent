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
    const handleScroll = () => setScrolled(window.scrollY > 10);
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
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          scrolled
            ? "bg-white/95 dark:bg-[#050505]/90 backdrop-blur-md py-3 shadow-md border-gray-200 dark:border-white/10"
            : "bg-white/95 dark:bg-[#050505]/60 backdrop-blur-sm py-4 border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* --- LEFT: BRANDING --- */}
          <div className="flex items-center gap-3 md:gap-4">
            <a 
              href="#"
              onClick={(e) => handleScrollTo(e, "#hero")}
              className="relative w-10 h-10 md:w-11 md:h-11 shrink-0 hover:opacity-90 transition-opacity"
            >
              <Image 
                  src={logo} 
                  alt="Logo" 
                  fill 
                  className="object-contain"
                  priority
              />
            </a>

            {/* Separador vertical: visible solo en desktop */}
            <div className="hidden md:block w-[1px] h-8 bg-gray-300 dark:bg-white/20"></div>

            <div className="flex flex-col">
              {/* TÍTULO PRINCIPAL: Negro absoluto en Light, Blanco absoluto en Dark */}
              <span className="font-display font-black text-lg md:text-xl leading-none tracking-tight text-black dark:text-white">
                TRANSCENDENT
              </span>
              
              {/* BADGE CRÍTICO DE LEGIBILIDAD */}
              {/* Light Mode: Fondo NEGRO sólido, Texto VERDE BRILLANTE */}
              {/* Dark Mode: Fondo VERDE OSCURO transp, Texto VERDE SUAVE */}
              <div className="mt-1 flex items-center gap-1.5 w-fit px-2 py-0.5 rounded bg-black dark:bg-emerald-950/40 border border-transparent dark:border-emerald-500/30">
                  <span className="font-mono text-[10px] uppercase font-bold text-[#4ADE80] tracking-widest">
                    Labs & Research
                  </span>
              </div>
            </div>
          </div>

          {/* --- CENTER: NAVIGATION (Desktop) --- */}
          {/* Usamos text-gray-600 en light para que no compita con el logo, pero hover black */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="text-xs font-bold uppercase tracking-widest text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors relative group py-2"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-black dark:bg-emerald-500 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* --- RIGHT: ICONS --- */}
          <div className="flex items-center gap-2">
            <button className="hidden md:flex p-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors">
              <Search className="w-5 h-5" />
            </button>
            
            <button className="relative p-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors group">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 dark:bg-emerald-500 rounded-full"></span>
            </button>

            <button
              className="lg:hidden p-2 text-black dark:text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* --- MOBILE MENU OVERLAY --- */}
      {/* Fondo blanco sólido en light, negro en dark. Sin transparencias que confundan. */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-[70px] left-0 right-0 z-40 bg-white dark:bg-[#0a0a0a] border-b border-gray-200 dark:border-white/10 shadow-xl lg:hidden"
          >
            <div className="p-6 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block py-4 text-lg font-bold text-black dark:text-white border-b border-gray-100 dark:border-white/5 active:text-emerald-600"
                  onClick={(e) => handleScrollTo(e, link.href)}
                >
                  {link.name}
                </a>
              ))}
              
              <div className="flex items-center gap-4 mt-6 pt-2">
                 <button className="flex-1 py-3 flex items-center justify-center gap-2 bg-gray-100 dark:bg-white/5 rounded-lg text-black dark:text-white font-bold text-sm">
                    <Search className="w-4 h-4" /> Search
                 </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}