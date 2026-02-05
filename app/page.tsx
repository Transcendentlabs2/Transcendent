'use client';

import { Atom } from "lucide-react";
import PremiumBackground from "./components/PremiumBackground";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero"; 
import TrustTicker from "./components/TrustTicker";
import LabGrid from "./components/LabGrid";
import ProductShowcase from "./components/ProductShowcase";
import FAQSection from "./components/FAQSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    // Agregamos !scroll-smooth al html via clase global o inline style si fuera necesario, 
    // pero idealmente deberías tener 'html { scroll-behavior: smooth; }' en tu globals.css.
    // Next.js maneja esto bien con ids estandar.
    <main className="relative flex min-h-dvh flex-col overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Elementos Globales */}
      <Navbar /> 
      <PremiumBackground />

      {/* Capa de ruido (Noise Overlay) */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 dark:opacity-5 pointer-events-none mix-blend-overlay fixed z-0"></div>

      {/* --- SECCIONES DE LA PÁGINA --- */}
      
      {/* 1. Hero Section (No necesita ID de scroll, es el top) */}
      <section id="hero">
        <Hero />
      </section>

      {/* 2. Trust Indicators (Testing) */}
      {/* scroll-mt-24 asegura que el navbar no tape el contenido al hacer scroll */}
      <section id="testing" className="scroll-mt-24">
        <TrustTicker />
      </section>
      
      {/* 3. Features / Lab Grid (Science) */}
      <section id="science" className="scroll-mt-24">
        <LabGrid />
      </section>
      
      {/* 4. Product Catalog */}
      <section id="catalog" className="scroll-mt-24">
        <ProductShowcase />
      </section>
      
      {/* 5. FAQ / Knowledge Base */}
      <section id="faq" className="scroll-mt-24">
        <FAQSection />
      </section>
      
      {/* 6. Footer */}
      <Footer />

      {/* Small Bottom Copyright Bar */}
      <div className="py-12 w-full px-6 flex justify-center text-[10px] text-[var(--text-muted)] font-mono uppercase border-t border-[var(--glass-border)] relative z-10 bg-[var(--bg-page)]">
        <div className="flex items-center gap-2">
           <Atom className="w-4 h-4 animate-spin-slow text-[var(--color-brand-primary)]" />
           <span>Transcendent Labs © 2026</span>
        </div>
      </div>

    </main>
  );
}