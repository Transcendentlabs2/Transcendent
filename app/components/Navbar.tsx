"use client";

import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, Search } from "lucide-react";
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 border-b ${
        scrolled
          ? "bg-white dark:bg-black border-slate-200 dark:border-white/10 py-2 shadow-sm"
          : "bg-white dark:bg-black border-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* --- LEFT: BRANDING --- */}
        <div className="flex items-center gap-4">
            <a 
                href="#"
                onClick={(e) => handleScrollTo(e, "#hero")}
                className="relative w-10 h-10 shrink-0 cursor-pointer hover:scale-105 transition-transform"
            >
                <Image 
                    src={logo} 
                    alt="Logo" 
                    fill 
                    className="object-contain"
                    priority
                />
            </a>

            {/* Separador vertical */}
            <div className="hidden md:block h-8 w-[1px] bg-slate-200 dark:bg-white/20" />

            <div className="flex flex-col justify-center">
                {/* TÍTULO */}
                <span className="font-display font-black text-lg md:text-xl leading-none tracking-tight text-slate-900 dark:text-white mb-1.5">
                    TRANSCENDENT
                </span>
                
                {/* BADGE (CÁPSULA) - El diseño exacto que pediste */}
                <div className="flex items-center justify-center px-3 py-1 rounded-full bg-black dark:bg-emerald-500/10 border border-transparent dark:border-emerald-500/20 w-fit shadow-sm">
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
              className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-black dark:text-slate-400 dark:hover:text-white transition-colors py-2"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* --- RIGHT: ICONS --- */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2">
             <button className="p-2 text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 rounded-full transition-colors">
                <Search className="w-5 h-5" />
             </button>
             <button className="relative p-2 text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 rounded-full transition-colors group">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 dark:bg-emerald-500 rounded-full border border-white dark:border-black"></span>
             </button>
          </div>

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
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden absolute top-[100%] left-0 right-0 bg-white dark:bg-black border-b border-slate-200 dark:border-white/10 shadow-xl"
          >
            <div className="p-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-lg font-bold text-slate-900 dark:text-white py-2 border-b border-slate-100 dark:border-white/10"
                  onClick={(e) => handleScrollTo(e, link.href)}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}