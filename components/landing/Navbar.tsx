"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X, ShoppingCart, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link"; // ✅ 1. IMPORTAMOS LINK
import logo from "@/app/assets/logo.webp"; 
import { useCart } from "@/context/CartContext"; 

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  
  const { toggleCart, cartCount } = useCart();
  
  const lastScrollY = useRef(0);

  // 1. Bloqueo de scroll en móvil
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"; 
      document.body.style.touchAction = "none"; 
    } else {
      document.body.style.overflow = ""; 
      document.body.style.touchAction = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [mobileOpen]);

  // 2. Lógica de Scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 0) return;

      setScrolled(currentScrollY > 20);

      if (Math.abs(currentScrollY - lastScrollY.current) > 10) {
         if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
           setIsVisible(false); 
         } else {
           setIsVisible(true); 
         }
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Función para scroll suave en anchors de la misma página
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Si es solo un hash (#), intentamos hacer scroll
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.replace("#", "");
      const element = document.getElementById(targetId);
      if (element) {
        setMobileOpen(false);
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    // Si no (ej: rutas externas), dejamos que Link actúe normal
  };

  const navLinks = [
    { name: "Catalog", href: "/#catalog" }, // ✅ Ajustado para funcionar desde /product/
    { name: "Verify Batch", href: "/#verification" },
    { name: "Calculator", href: "/#calculator" },
    { name: "Science", href: "/#science" },
    { name: "FAQ", href: "/#faq" },
  ];

  const showNavbar = isVisible || mobileOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-transform ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      } ${
        scrolled
          ? "bg-[var(--bg-page)]/90 backdrop-blur-xl border-b border-[var(--glass-border)] py-3 shadow-sm"
          : "bg-transparent border-b border-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* --- LEFT: BRANDING --- */}
        <div className="flex items-center gap-4">
            
            {/* ✅ LOGO: LINK A HOME */}
            <Link 
                href="/" 
                className="relative w-10 h-10 md:w-11 md:h-11 shrink-0 cursor-pointer hover:scale-105 transition-transform"
            >
                <Image 
                    src={logo} 
                    alt="Logo" 
                    fill 
                    className="object-contain"
                    priority
                />
            </Link>

            <div className={`hidden md:block h-8 w-[1px] bg-[var(--text-muted)] opacity-20`} />

            {/* ✅ TEXTO: LINK A HOME */}
            <Link href="/" className="flex flex-col justify-center cursor-pointer group">
                <span className="font-display font-black text-lg md:text-xl leading-none tracking-tight text-[var(--text-main)] mb-1.5 transition-colors group-hover:text-[var(--color-brand-primary)]">
                    TRANSCENDENT
                </span>
                
                <div className="flex items-center justify-center px-3 py-0.5 rounded-full bg-black dark:bg-emerald-500/10 border border-transparent dark:border-emerald-500/20 w-fit shadow-sm">
                    <span className="font-mono text-[9px] md:text-[10px] uppercase font-bold text-[#4ADE80] tracking-[0.15em] leading-none">
                        Labs & Research
                    </span>
                </div>
            </Link>
        </div>

        {/* --- CENTER: NAVIGATION (Desktop) --- */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              // Si estamos en home, hacemos scroll suave, si no, navega
              onClick={(e) => handleScrollTo(e as any, link.href)}
              className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors py-2 relative group cursor-pointer"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[var(--color-brand-primary)] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* --- RIGHT: ICONS --- */}
        <div className="flex items-center gap-2 md:gap-3">
          <div className="hidden md:flex items-center gap-2">
              <button className="p-2 text-[var(--text-main)] hover:bg-[var(--text-muted)]/10 rounded-full transition-colors cursor-pointer">
                 <Search className="w-5 h-5" />
              </button>
              
              <button 
                onClick={toggleCart} 
                className="relative p-2 text-[var(--text-main)] hover:bg-[var(--text-muted)]/10 rounded-full transition-colors group cursor-pointer"
              >
                 <ShoppingCart className="w-5 h-5 group-hover:text-[var(--color-brand-primary)] transition-colors" />
                 {cartCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold flex items-center justify-center rounded-full border-2 border-[var(--bg-page)] animate-bounce">
                        {cartCount}
                    </span>
                 )}
              </button>
          </div>

          <button
            className="lg:hidden flex items-center justify-center p-2 -mr-2 text-[var(--text-main)] active:scale-95 transition-transform"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            style={{ minWidth: "44px", minHeight: "44px" }} 
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* --- MOBILE MENU --- */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }} 
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute top-[100%] left-0 right-0 bg-[var(--bg-page)] border-b border-[var(--glass-border)] shadow-2xl overflow-y-auto"
            style={{ maxHeight: "calc(100vh - 80px)" }} 
          >
            <div className="p-6 flex flex-col gap-4 pb-20"> 
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-lg font-bold text-[var(--text-main)] py-4 border-b border-[var(--glass-border)] last:border-0 active:text-[var(--color-brand-primary)] transition-colors"
                  onClick={(e) => handleScrollTo(e as any, link.href)}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="flex items-center gap-4 mt-4 pt-6 border-t border-[var(--glass-border)]">
                 <button className="flex-1 py-4 flex items-center justify-center gap-2 bg-[var(--text-muted)]/10 rounded-lg text-[var(--text-main)] font-bold text-sm active:bg-[var(--text-muted)]/20">
                    <Search className="w-5 h-5" /> Search
                 </button>
                 
                 <button 
                    onClick={() => {
                        setMobileOpen(false);
                        toggleCart();
                    }}
                    className="flex-1 py-4 flex items-center justify-center gap-2 bg-[var(--text-main)] text-[var(--bg-page)] rounded-lg font-bold text-sm active:scale-95 transition-transform relative"
                 >
                    <ShoppingCart className="w-5 h-5" /> Cart 
                    {cartCount > 0 && <span className="ml-1 opacity-80">({cartCount})</span>}
                 </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}