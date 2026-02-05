"use client";

import { useState, useEffect } from "react";
import { Beaker, Menu, X, ShoppingCart, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Función para manejar el scroll suave manual (opcional, pero recomendado para UX perfecta)
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    
    if (element) {
      // Cerramos menú móvil si está abierto
      setMobileOpen(false);
      // Scroll suave
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { name: "Catalog", href: "#catalog" },
    { name: "Peptide Science", href: "#science" }, // Apunta al LabGrid
    { name: "Testing", href: "#testing" },         // Apunta al TrustTicker
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled
          ? "bg-[var(--bg-page)]/80 backdrop-blur-md border-[var(--glass-border)] py-3"
          : "bg-transparent py-6 border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Logo Area (Click para ir arriba) */}
        <a 
          href="#"
          onClick={(e) => handleScrollTo(e, "#hero")}
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-[var(--color-brand-primary)]/10 border border-[var(--color-brand-primary)]/20 group-hover:border-[var(--color-brand-primary)] transition-colors">
            <Beaker className="w-5 h-5 text-[var(--color-brand-primary)] transform group-hover:rotate-12 transition-transform" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-lg leading-none tracking-wide text-[var(--text-main)]">
              TRANSCENDENT
            </span>
            <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--color-brand-secondary)] uppercase">
              Labs & Research
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="text-xs font-medium uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--color-brand-primary)] transition-colors relative group cursor-pointer"
            >
              {link.name}
              <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-[var(--color-brand-primary)] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button className="p-2 text-[var(--text-main)] hover:bg-[var(--glass-border)] rounded-full transition-colors cursor-pointer">
            <Search className="w-5 h-5" />
          </button>
          <button className="relative p-2 text-[var(--text-main)] hover:bg-[var(--glass-border)] rounded-full transition-colors group cursor-pointer">
            <ShoppingCart className="w-5 h-5 group-hover:text-[var(--color-brand-primary)] transition-colors" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--color-brand-secondary)] rounded-full animate-pulse"></span>
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-[var(--text-main)]"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-[var(--glass-border)] bg-[var(--bg-page)] overflow-hidden"
          >
            <div className="p-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-lg font-display font-medium text-[var(--text-main)] hover:text-[var(--color-brand-primary)] cursor-pointer"
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