"use client";
import { useState, useEffect } from "react";
import { Beaker, Menu, X, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Research", href: "#" },
    { name: "Peptides", href: "#" },
    { name: "Quality", href: "#" },
    { name: "FAQ", href: "#" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b ${
        scrolled
          ? "glass-panel py-3 border-[var(--glass-border)]"
          : "bg-transparent py-5 border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="relative">
            <Beaker className="w-8 h-8 text-[var(--color-brand-primary)] group-hover:rotate-12 transition-transform duration-300" />
            <div className="absolute inset-0 bg-[var(--color-brand-primary)] blur-lg opacity-40 rounded-full" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-lg leading-none tracking-wide text-[var(--text-main)]">
              TRANSCENDENT
            </span>
            <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--color-brand-secondary)] uppercase">
              Labs & Research
            </span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-[var(--text-muted)] hover:text-[var(--color-brand-primary)] transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[var(--color-brand-primary)] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          
          <button className="relative p-2 hover:bg-[var(--glass-border)] rounded-full transition-colors">
             <ShoppingCart className="w-5 h-5 text-[var(--text-main)]" />
             <span className="absolute top-0 right-0 w-2 h-2 bg-[var(--color-brand-secondary)] rounded-full shadow-[0_0_10px_var(--color-brand-secondary)]"></span>
          </button>
        </nav>

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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full glass-panel border-t border-[var(--glass-border)] md:hidden flex flex-col p-6 gap-4"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-lg font-medium text-[var(--text-main)] hover:text-[var(--color-brand-primary)]"
                onClick={() => setMobileOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}